/**
 * Alert.js
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
      required: true,
      description: 'The alert text that will be sent.'
    },

    deviceId: {
      type: 'string',
      required: true,
      description: 'The ID of the Avimesa device this alert is for.'
    },

    enableEmailNotifications: {
      type: 'boolean',
      description: 'Whether to send notifications for this alert via email.'
    },

    enableSMSNotifications: {
      type: 'boolean',
      description: 'Whether to send notifications for this alert via SMS.'
    },

    notificationCooldown: {
      type: 'number',
      description: 'The number of milliseconds to wait between sending notifications for this alert.',
      defaultsTo: 1000*60*5//« 5 minutes
    },

    lastTriggeredAt: {
      type: 'number',
      description: 'The last time a notification went out for this alert.'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    recipients: {
      collection: 'User'
    },

    conditions: {
      collection: 'AlertCondition',
      via: 'alert'
    },

  },

};

