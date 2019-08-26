/**
 * Notification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    description: {
      type: 'string',
      description: 'Cached version of the alert description at the time the notification was sent.',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    recipients: {
      description: 'A cached list of recipient names and contact info at the time the notification was sent.',
      type: 'json',
      defaultsTo: [],
      example: [{
        id: 1,
        fullName: 'P. Franken Vandermelt',
        emailAddress: 'pfv@example.com',
        phone: '12224445555'
      }]
    },

    channels: {
      description: 'A cached list of the channels through which this notification was sent.',
      type: 'json',
      defaultsTo: [],
      example: [
        'Email',
        'SMS'
      ]
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    alert: {
      model: 'Alert'
    },

    sensors: {
      collection: 'Sensor',
      via: 'notifications'
    },

  },

};

