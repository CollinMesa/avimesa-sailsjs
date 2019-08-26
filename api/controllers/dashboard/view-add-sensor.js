module.exports = {


  friendlyName: 'View add sensor',


  description: 'Display "Add sensor" page.',


  inputs: {

    deviceId: {
      type: 'string',
      description: 'The Avimesa device ID.',
      required: true,
    },

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/add-sensor'
    },

    redirect:  {
      responseType: 'redirect'
    },

    notFound: {
      responseType: 'notFound'
    },

  },


  fn: async function ({deviceId}) {
    // Get our device
    var allDevices = await sails.helpers.avimesa.listAvimesaDevices();
    var device = _.find(allDevices, {deviceId});
    if(!device) {
      throw 'notFound';
    }

    // Grab our list of existing sensors.
    var sensors = await Sensor.find({deviceId});
    // If we are already maxed out on sensors, redirect.
    if(sensors.length >= 7) {
      throw {redirect: `devices/${encodeURIComponent(deviceId)}`};
    }

    // Get our available units and channel indices for the dropdown menus.
    var units = await sails.helpers.avimesa.getAvimesaUnits();
    var availableChannelIndices = _.difference(
      [0,1,2,3,4,5,6],
      _.pluck(sensors, 'channelIndex')
    );


    // Respond with view.
    return {
      currentSection: 'devices',
      device,
      units,
      availableChannelIndices,
    };

  }


};
