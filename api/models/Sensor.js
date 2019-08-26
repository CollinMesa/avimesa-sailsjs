/**
 * Sensor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      description: 'The name by which this sensor will be referenced in the UI.'
    },

    locationDescription: {
      type: 'string',
      description: 'A description of where the sensor is located.'
    },

    measurementDisplayName: {
      type: 'string',
      description: 'The display name for the chart of this sensor\'s readings.'
    },

    deviceId: {
      type: 'string',
      description: 'The ID of the Avimesa device to which this sensor is connected.'
    },

    channelIndex: {
      type: 'number',
      min: 0,
      max: 7,
      description: 'The index of the notification channel for this sensor\'s data.'
    },

    unit: {
      type: 'number',
      defaultsTo: 0,
      description: 'The base 10 value of the unit of measurement for this sensor\'s data.',
      extendedDescription: 'Can be found by calling `sails.helpers.avimesa.getAvimesaUnits()`.'
    },

    settlingTime: {
      type: 'number',
      max: 60000,
      defaultsTo: 4.00,
      description: 'The time in seconds that will elapse before beginning to take readings.',
    },

    maxReading: {
      type: 'number',
      required: true,
      description: 'The maximum reading value available from this sensor.',
      extendedDescription: 'Available on the sensor itself, or on its packaging.'
    },

    minReading: {
      type: 'number',
      required: true,
      description: 'The minimum reading value available from this sensor.',
      extendedDescription: 'Available on the sensor itself, or on its packaging.'
    },


    // FUTURE:
    // `type` (always 4-20 mA sensor for now)

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    sensorReadings: {
      collection: 'SensorReading',
      via: 'sensor'
    },

    notifications: {
      collection: 'Notification',
      via: 'sensors'
    }
  },

};

