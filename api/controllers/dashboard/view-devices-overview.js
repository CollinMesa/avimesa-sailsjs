module.exports = {


  friendlyName: 'View devices',


  description: 'Display "Devices" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/devices-overview'
    }

  },


  fn: async function () {

    var devices = await sails.helpers.avimesa.listAvimesaDevices();
    for (let device of devices) {
      let sensors = await Sensor.find({deviceId: device.deviceId});
      device.sensors = _.pluck(sensors, 'id');
    }

    // Respond with view.
    return {
      currentSection: 'devices',
      devices
    };

  }


};
