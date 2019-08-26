module.exports = {


  friendlyName: 'Destroy one alert',


  description: 'Destroy one of the alerts monitoring a particular Avimesa device.',


  inputs: {

    id: {
      required: true,
      type: 'number',
      description: 'The ID of the alert to remove.',
    },

  },


  exits: {
    success: { description: 'Alert was successfully destroyed.' },
    notFound: { responseType: 'notFound' },
  },


  fn: async function ({ id }) {
    var alert = await Alert.findOne({id});
    if (!alert) {
      throw 'notFound';
    }

    await AlertCondition.archive({alert: id});
    let { deviceId } = await Alert.archiveOne({id}).fetch();

    await sails.helpers.compileAndTransloadDeviceFiles(deviceId);
  }


};
