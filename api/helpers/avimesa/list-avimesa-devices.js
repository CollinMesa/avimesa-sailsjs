module.exports = {


  friendlyName: 'List Avimesa devices',


  description: 'Get a list of Avimesa device IDs.',


  inputs: {

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
      outputDescription: 'An array of avimesa device details.'
    },

  },


  fn: async function ({apiKey, apiPassword, hostname}) {


    var avimesa = require('@avimesa/group-api-amqp');

    avimesa.setConnParams({
      apiKey,
      apiPassword,
      hostname
    });

    // // The response from `listDevicesAsync()` is a dictionary e.g.
    // // ```
    // // {
    // //   err: false,
    // //   devices: [
    // //    {
    // //       "dev_id": "asdf",
    // //       "name": "asdf",
    // //       "location": "asdf"
    // //     },
    // //   ]
    // // }
    // // ```

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // TODO: enable the following once `listDevicesFullAsync` is ready!!
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // var response = await avimesa.listDevicesFullAsync();
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var response = await avimesa.listDevicesAsync();
    if(response.err) {
      // If `err` is true, then `devices` is set to the error message,
      // so we'll throw an error with that message.
      let message = _.isString(response.devices) ? response.devices : 'Could not list Avimesa devices.';
      throw new Error(message);
    }

    var avimesaDevices = response.devices;
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // TODO: enable the following once `listDevicesFullAsync` is ready!!
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // return avimesaDevices;
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return _.reduce(avimesaDevices, (memo, deviceId)=>{
      memo.push({
        name: 'TODO',
        location: 'TODO',
        deviceId: deviceId
      });
      return memo;
    }, []);
  }


};

