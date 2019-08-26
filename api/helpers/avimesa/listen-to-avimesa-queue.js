module.exports = {


  friendlyName: 'Listen to Avimesa queue',


  description: 'Start listening for new messages from a queue.',


  sync: true,


  inputs: {

    queueName: {
      required: true,
      type: 'string',
      isIn: [
        'raw',// « raw data queue
        'notification',// « notification queue
      ]
    },

    handleNewMessage: {
      required: true,
      description: 'An async function to run every time a fresh message containing new sensor readings is received from the queue.',
      extendedDescription: 'This function receives one argument: a dictionary containing: the raw message from the queue (.raw), the string ID of the originating Avimesa device (.deviceId), and an array of sensor readings (.newSensorReadings).',
      custom: (handleNewMessage)=>{
        if (!_.isFunction(handleNewMessage) || handleNewMessage.constructor.name !== 'AsyncFunction') {
          throw new Error(`Expecting an async function but instead got ${handleNewMessage}`);
        }
        return true;
      }
    }

  },


  exits: {

    success: {
      description: 'The success exit will never run; i.e. listening will continue until the process terminates.',
    },

  },


  fn: function ({ queueName, handleNewMessage }) {
    var util = require('util');
    var avimesa = require('@avimesa/group-api-amqp');

    avimesa.setConnParams({
      apiKey: sails.config.custom.avimesaApiKey,
      apiPassword: sails.config.custom.avimesaApiPassword,
      hostname: sails.config.custom.avimesaHostname,
    });

    avimesa.consume(avimesa.getRmqSettings().queues[queueName], (err, queueMsg, ack)=> {
      if(err){
        sails.log.error(Object.assign(
          new Error(`Could not consume message from "${queueName}" Avimesa queue.  (See .raw for error details.)`),
          {
            raw: { avimesaErr: err, avimesaQueueMsg: queueMsg }
          }
        ));
      } else {
        (async()=>{

          // Parse message, expecting it in the standard format.
          let newSensorReadings = [];
          let deviceId = queueMsg.dev.dev_id;
          let channels = queueMsg.dev.chans;
          let measuredAt = queueMsg.dts*1000;//« we x1000 this because it is in seconds instead of milliseconds
          for(let channel of channels) {
            let channelIndex = channel.ch_idx;
            let channelData = channel.ch_data;
            for (let dataPoint of channelData) {
              newSensorReadings.push({
                deviceId: deviceId,
                channelIndex: channelIndex,
                units: dataPoint.units,
                value: !!dataPoint.val ? dataPoint.val : 0,
                measuredAt: measuredAt
              });
            }//∞
          }//∞

          // If we receive a message with no new sensor readings for some
          // reason, then just disregard it.  Otherwise, handle it by triggering
          // the function provided as a procedural parameter.
          if (newSensorReadings.length >= 1) {
            await handleNewMessage({
              deviceId,
              newSensorReadings,
              raw: queueMsg
            });
          }//ﬁ

        })()
        .then(()=>{
          sails.log.silly(`Successfully consumed new message from "${queueName}" Avimesa queue:  ${util.inspect(queueMsg, {depth: 4})}`);
          ack(true);
        })
        .catch((err)=>{
          sails.log.error(Object.assign(
            new Error(`Node.js code in this project encountered an error when attempting to consume new message from "${queueName}" Avimesa queue.  (See .raw for error details.)`),
            { raw: err }
          ));
        });//_∏_
      }
    });//œ
  }


};

