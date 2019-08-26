module.exports = {


  friendlyName: 'View device detail',


  description: 'Display "Device detail" page.',


  inputs: {

    deviceId: {
      type: 'string',
      description: 'The Avimesa device ID.',
      required: true,
    },

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/device-detail'
    },

    notFound: {
      responseType: 'notFound'
    },

  },


  fn: async function ({deviceId}) {
    var allDevices = await sails.helpers.avimesa.listAvimesaDevices();
    var device = _.find(allDevices, {deviceId});
    if(!device) {
      throw 'notFound';
    }
    var sensors = await Sensor.find({deviceId: deviceId}).sort('channelIndex ASC');
    var units = await sails.helpers.avimesa.getAvimesaUnits();
    for(let sensor of sensors) {
      var unit = _.find(units, {base10Value: sensor.unit});
      sensor.displayUnit = unit.description;
    }

    var alerts = await Alert.find({deviceId})
    .populate('recipients');
    for(let alert of alerts) {
      let channels = [];
      if(alert.enableEmailNotifications) {
        channels.push('Email');
      }
      if(alert.enableSMSNotifications) {
        channels.push('SMS');
      }
      alert.displayChannels = channels.join(', ');
      alert.displayRecipients = await sails.helpers.getNotificationDisplayRecipients(alert.recipients);
    }

    var deviceConfigAsString = await sails.helpers.getDeviceConfigJson(deviceId);
    var deviceDriverScriptAsString = await sails.helpers.getDeviceDriverScript(deviceId);

    // Respond with view.
    return {
      currentSection: 'devices',
      device,
      sensors,
      alerts,
      deviceConfigAsString,
      deviceDriverScriptAsString,
    };

  }


};
