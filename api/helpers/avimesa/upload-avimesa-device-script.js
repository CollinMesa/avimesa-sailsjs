module.exports = {


  friendlyName: 'Upload Avimesa device script',


  description: 'Upload a driver script for an Avimesa device.',


  extendedDescription: 'This will replace the existing device driver script.',


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
      description: 'The device driver script has been uploaded.',
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

    var scriptBuf = fs.readFileSync(path);
    // > We build a Promise & send it back as our "thenable"
    // > (AsyncFunction's return value).  This is necessary b/c we're wrapping
    // > an api that isn't `await`-compatible.
    return new Promise((resolve, reject)=>{
      try {
        avimesa.uploadScript(deviceId, scriptBuf, (err, msg)=>{
          if (err) {
            var message = msg || 'Error uploading device driver script file.';
            // sails.log.error(message);
            reject(new Error(message));
          }
          else {
            resolve();
          }
        });// avimesa.uploadScript()
      } catch (err) {
        reject(err);
      }
    });//•
  }


};

