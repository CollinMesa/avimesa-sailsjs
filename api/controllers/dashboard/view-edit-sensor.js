module.exports = {


  friendlyName: 'View edit sensor',


  description: 'Display "Edit sensor" page.',


  inputs: {

    deviceId: {
      type: 'string',
      description: 'The Avimesa device ID.',
      required: true,
    },

    sensorId: {
      type: 'string',
      description: 'The ID of the sensor in our database',
      required: true,
    },

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/edit-sensor'
    }

  },


  fn: async function ({deviceId, sensorId}) {

    var allDevices = await sails.helpers.avimesa.listAvimesaDevices();
    var device = _.find(allDevices, {deviceId});
    var sensor = await Sensor.findOne({id: sensorId});
    var units = await sails.helpers.avimesa.getAvimesaUnits();

    // Respond with view.
    return {
      currentSection: 'devices',
      device,
      sensor,
      units
    };

  }


};
