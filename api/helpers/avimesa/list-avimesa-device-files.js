module.exports = {


  friendlyName: 'List Avimesa device files',


  description: 'Get a list of files uploaded to an Avimesa device.',


  inputs: {

    deviceId: {
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
      outputType: [{}],
      outputDescription: 'An array of file details.'
    },

  },


  fn: async function ({deviceId, apiKey, apiPassword, hostname}) {

    var avimesa = require('@avimesa/group-api-amqp');

    avimesa.setConnParams({
      apiKey,
      apiPassword,
      hostname
    });

    // The response from `listFilesAsync()` is a dictionary e.g.
    // ```
    // {
    //   err: false,
    //   files: [{ path: '/data/fw-app.dat', size: '137895', time: '1540929865' }]
    // }
    // ```
    var response = await avimesa.listFilesAsync(deviceId);
    if(response.err) {
      // If `err` is true, then `files` is set to the error message,
      // so we'll throw an error with that message.
      let message = _.isString(response.files) ? response.files : `Could not list files for the Avimesa device w/ ID ${deviceId}.`;
      throw new Error(message);
    }

    var avimesaDeviceFiles = response.files;
    return avimesaDeviceFiles;

  }


};

