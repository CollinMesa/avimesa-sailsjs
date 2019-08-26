module.exports = {


  friendlyName: 'Update one sensor',


  description: 'Update a sensor\'s unit of measurement, name, and other info.',


  inputs: {

    id: {
      required: true,
      type: 'number',
      description: 'The ID of the sensor to update.',
    },

    unit: {
      type: 'number',
    },

    name: {
      type: 'string',
    },

    locationDescription: {
      type: 'string',
    },

    measurementDisplayName: {
      type: 'string',
    },

    maxReading: {
      type: 'number',
    },

    minReading: {
      type: 'number'
    },

  },


  exits: {

    notFound: {
      responseType: 'notFound'
    },

  },


  fn: async function ({id, unit, name, locationDescription, measurementDisplayName, maxReading, minReading}) {

    var sensor = await Sensor.findOne({id: id});
    if(!sensor) {
      throw 'notFound';
    }

    await Sensor.updateOne({id: id}).set({
      unit,
      name,
      locationDescription,
      measurementDisplayName,
      maxReading,
      minReading,
    });

    var changesAffectDeviceFiles = (
      (!_.isUndefined(unit) && unit !== sensor.unit) ||
      (!_.isUndefined(maxReading) && maxReading !== sensor.maxReading) ||
      (!_.isUndefined(minReading) && minReading !== sensor.minReading)
    );
    if(changesAffectDeviceFiles) {
      // Compile + upload updated device files.
      await sails.helpers.compileAndTransloadDeviceFiles(sensor.deviceId);
    }

  }


};
