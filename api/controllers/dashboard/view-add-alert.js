module.exports = {


  friendlyName: 'View add alert',


  description: 'Display "Add alert" page.',


  inputs: {

    deviceId: {
      type: 'string',
      description: 'The Avimesa device ID.',
      required: true,
    },

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/add-alert'
    },

    notFound: {
      responseType: 'notFound',
    },

    redirect: {
      responseType: 'redirect',
    },

  },


  fn: async function ({deviceId}) {
    var allDevices = await sails.helpers.avimesa.listAvimesaDevices();
    var device = _.find(allDevices, {deviceId});
    if(!device) {
      throw 'notFound';
    }
    var sensors = await Sensor.find({deviceId: deviceId});
    if(sensors.length === 0) {
      throw { redirect: `/devices/${encodeURIComponent(deviceId)}`};
    }
    var users = await User.find().select(['id','fullName','emailAddress','phone']);

    return {
      currentSection: 'devices',
      device,
      sensors,
      users
    };

  }


};
