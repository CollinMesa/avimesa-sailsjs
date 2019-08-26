module.exports = {


  friendlyName: 'Destroy one sensor',


  description: 'Remove sensor configuration from an Avimesa device.',


  inputs: {

    id: {
      required: true,
      type: 'number',
      description: 'The ID of the sensor to remove.',
    },

  },


  exits: {

    notFound: {
      responseType: 'notFound'
    },

  },


  fn: async function ({id}) {

    var sensor = await Sensor.findOne({id: id});
    if(!sensor) {
      throw 'notFound';
    }

    // Archive data points for this sensor.
    await SensorReading.archive({sensor: id});
    // Archive the sensor itself.
    await Sensor.archiveOne({id: id});

    // Compile + upload updated device files.
    await sails.helpers.compileAndTransloadDeviceFiles(sensor.deviceId);

  }


};
