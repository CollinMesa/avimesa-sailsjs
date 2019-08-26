module.exports = {


  friendlyName: 'Create sensor',


  description: 'Configure a new sensor for an Avimesa device.',


  inputs: {

    deviceId: {
      type: 'string',
      required: true,
    },

    unit: {
      type: 'number',
      required: true,
    },

    name: {
      type: 'string',
      required: true,
    },

    locationDescription: {
      type: 'string',
    },

    measurementDisplayName: {
      type: 'string',
    },

    maxReading: {
      type: 'number',
      required: true,
    },

    minReading: {
      type: 'number',
      required: true,
    },

    channelIndex: {
      type: 'number',
      required: true
    },

  },


  exits: {

    tooManySensors: {
      description: 'This device has already reached the maximum of 7 sensors.'
    },

    channelIndexInUse: {
      description: 'That channel index is already in use by another sensor on this device.'
    },

  },


  fn: async function ({deviceId, unit, name, locationDescription, measurementDisplayName, maxReading, minReading, channelIndex}) {

    // First, make sure we don't already have the maximum number of sensors configured for this device.
    var existingSensorTotal = await Sensor.count({deviceId: deviceId});
    if(existingSensorTotal > 6) {
      throw 'tooManySensors';
    }

    var channelIndexInUse = await Sensor.count({ deviceId, channelIndex });
    if(channelIndexInUse) {
      throw 'channelIndexInUse';
    }

    // Create our new sensor with the first empty channel index.
    await Sensor.create({
      deviceId,
      unit,
      name,
      locationDescription,
      measurementDisplayName,
      maxReading,
      minReading,
      channelIndex,
    });

    // Compile + upload our device files.
    await sails.helpers.compileAndTransloadDeviceFiles(deviceId);

  }


};
