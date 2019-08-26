/**
 * receive-avimesa-messages-and-trigger-alerts hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineHook(sails) {

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function() {

      sails.log.info('Initializing custom hook (`receive-avimesa-messages`)');

      // Start consuming data from the raw data queue, firing off a handler
      // function every time a new message is available.
      sails.helpers.avimesa.listenToAvimesaQueue('raw', async({deviceId, newSensorReadings, raw: unusedRawQueueMsg})=>{

        let sensors = await Sensor.find({deviceId});

        let sensorReadingsToCreate = [];
        for (let reading of newSensorReadings) {
          let sensor = _.find(sensors, {channelIndex: reading.channelIndex});
          let isEmptyChannel = !sensor;
          if(!isEmptyChannel) {
            sensorReadingsToCreate.push(_.extend(reading, {
              sensor: sensor.id
            }));
          }//ﬁ
        }//∞

        await SensorReading.createEach(sensorReadingsToCreate);
        sails.log.verbose('Successfully saved sensor data from', new Date(newSensorReadings[0].measuredAt));
      });//œ


      // Start consuming data from the notification queue, firing off a handler
      // function every time a new notification message is available.
      //
      // > Note: This is important to ensure alerts are triggered as quickly as
      // > possible.  Due to high volume, sensor data might not yet be available
      // > in the raw data queue, so we can use the notification queue to ensure
      // > that triggered alert conditions are detectable and can be used to
      // > inform the right users ASAP.
      sails.helpers.avimesa.listenToAvimesaQueue('notification', async({deviceId, newSensorReadings, raw: unusedRawQueueMsg})=>{

        let sensors = await Sensor.find({deviceId});

        // An alert is "triggered" if all of its conditions are met by the
        // incoming new sensor readings.
        await Alert.stream({ deviceId })
        .populate('conditions')
        .populate('recipients')
        .eachRecord(async(alert)=>{
          let isTriggered = alert.conditions.every((condition)=>{
            let sensor = _.find(sensors,{id:condition.sensor});
            return newSensorReadings.some((reading) =>
              reading.channelIndex === sensor.channelIndex &&
              (
                condition.comparisonOperator === '<' ?
                (reading.value < condition.value)
                :
                (reading.value > condition.value)
              )
            );
          });

          if (isTriggered) {
            let tooSoon = alert.lastTriggeredAt > (Date.now() - alert.notificationCooldown);
            if(!tooSoon) {
              let channels = [];
              if(alert.enableEmailNotifications) {
                channels.push('Email');
              }
              if(alert.enableSMSNotifications) {
                channels.push('SMS');
              }
              let recipients = _.map(alert.recipients, (recipient)=>_.pick(recipient, ['id', 'fullName', 'emailAddress', 'phone']));
              await Notification.create({
                alert: alert.id,
                description: alert.description,
                recipients: recipients,
                channels: channels,
                sensors: _.pluck(await AlertCondition.find({ alert: alert.id }), 'sensor')
              });
              for(let recipient of recipients) {
                if(alert.enableEmailNotifications) {
                  // console.log(`Attempting to send email to recipient ${require('util').inspect(recipient,{depth:4})}  regarding alert ${require('util').inspect(alert,{depth:4})} using notification ${require('util').inspect(notificationData,{depth:4})}`);
                  await sails.helpers.sendTemplateEmail.with({
                    to: recipient.emailAddress,
                    subject: alert.description,
                    template: 'email-new-alert',
                    layout: false,
                    templateData: {
                      fullName: recipient.fullName,
                      alertDescription: alert.description,
                    }
                  });
                }//ﬁ
                if(alert.enableSMSNotifications) {
                  // FUTURE: support SMS
                  sails.log.info('Would have sent SMS notification');
                }
              }//∞
              // Update 'lastTriggeredAt' on the alert itself.
              await Alert.updateOne({id: alert.id})
              .set({
                lastTriggeredAt: Date.now()
              });
            }//ﬁ
          }//∞
        });//∞
      });//œ

    }//</.initialize>

  };

};

