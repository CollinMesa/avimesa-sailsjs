module.exports = {


  friendlyName: 'Add Avimesa device',


  description: 'Provision a new Avimesa device.',


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
      description: 'A new device has been provisioned.',
      outputType: 'string',
      outputDescription: 'The auth key for the newly-added device.'
    },

  },


  fn: async function ({deviceId, apiKey, apiPassword, hostname}) {

    var avimesa = require('@avimesa/group-api-amqp');

    avimesa.setConnParams({
      apiKey,
      apiPassword,
      hostname
    });

    // The response from `addDeviceAsync()` is a dictionary e.g.
    // ```
    // {
    //   err: false,
    //   authKey: '2ff87d3a0d064d278ecff756aa57ebf6'
    // }
    // ```
    var response = await avimesa.addDeviceAsync(deviceId);
    if(response.err) {
      // If `err` is true, then `authKey` is set to a dictionary containing the error message,
      // so we'll throw an error with that message.
      let message = response.authKey && response.authKey.status ? response.authKey.status : `Could not add a new Avimesa device w/ ID ${deviceId}.`;
      throw new Error(message);
    }

    var avimesaDeviceAuthKey = response.authKey;
    return avimesaDeviceAuthKey;

  }


};

