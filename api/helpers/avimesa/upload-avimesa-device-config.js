module.exports = {


  friendlyName: 'Upload Avimesa device config',


  description: 'Upload a config file for an Avimesa device.',


  extendedDescription: 'This will replace the existing config file on the device.',


  inputs: {

    deviceId: {
      type: 'string',
      required: true,
    },

    path: {
      type: 'string',
      required: true,
    },

    apiKey: {
      type: 'string',
      required: true
    },

    apiPassword: {
      type: 'string',
      required: true
    },

    hostname: {
      type: 'string',
    }

  },


  exits: {

    success: {
      description: 'The config file has been uploaded.',
    },

  },


  fn: async function ({deviceId, path, apiKey, apiPassword, hostname}) {
    var fs = require('fs');
    var avimesa = require('@avimesa/group-api-amqp');

    avimesa.setConnParams({
      apiKey,
      apiPassword,
      hostname
    });

    var configBuf = fs.readFileSync(path);
    // > We build a Promise & send it back as our "thenable"
    // > (AsyncFunction's return value).  This is necessary b/c we're wrapping
    // > an api that isn't `await`-compatible.
    return new Promise((resolve, reject)=>{
      try {
        avimesa.uploadConfig(deviceId, configBuf, (err, msg)=>{
          if (err) {
            var message = msg || 'Error uploading config file.';
            // sails.log.error(message);
            reject(new Error(message));
          }
          else {
            resolve();
          }
        });// avimesa.uploadConfig()
      } catch (err) {
        reject(err);
      }
    });//•
  }
};

