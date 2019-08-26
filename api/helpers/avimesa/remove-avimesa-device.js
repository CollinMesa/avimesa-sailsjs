module.exports = {


  friendlyName: 'Remove Avimesa device',


  description: 'Remove an Avimesa device, along with all its files and cached data.',


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
      description: 'The Avimesa device has been removed.',
    },

  },


  fn: async function ({deviceId, apiKey, apiPassword, hostname}) {

    var avimesa = require('@avimesa/group-api-amqp');

    avimesa.setConnParams({
      apiKey,
      apiPassword,
      hostname
    });

    // The response from `removeDeviceAsync()` is a dictionary e.g.
    // ```
    // {
    //   err: false,
    //   msg: ''
    // }
    // ```
    var response = await avimesa.removeDeviceAsync(deviceId);
    if(response.err) {
      // If `err` is true, then `msg` is set to a dictionary containing the error message,
      // so we'll throw an error with that message.
      let message = response.msg && response.msg.status ? response.msg.status : `Could not add a new Avimesa device w/ ID ${deviceId}.`;
      throw new Error(message);
    }

    // All done.

  }


};

