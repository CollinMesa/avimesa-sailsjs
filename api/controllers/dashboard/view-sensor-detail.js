module.exports = {


  friendlyName: 'View sensor detail',


  description: 'Display "Sensor detail" page.',


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
      viewTemplatePath: 'pages/dashboard/sensor-detail'
    },

    notFound: {
      responseType: 'notFound'
    },

  },


  fn: async function ({deviceId, sensorId}) {

    var allDevices = await sails.helpers.avimesa.listAvimesaDevices();
    var device = _.find(allDevices, {deviceId});
    if(!device) {
      throw 'notFound';
    }

    var units = await sails.helpers.avimesa.getAvimesaUnits();
    var sensor = await Sensor.findOne({id: sensorId})
    .populate('notifications', {limit: 50, sort: 'createdAt DESC'});

    if(!sensor) {
      throw 'notFound';
    }

    for (let notification of sensor.notifications) {
      notification.displayChannels = notification.channels.join(', ');
      notification.displayRecipients = await sails.helpers.getNotificationDisplayRecipients(notification.recipients);
    }

    var unit = _.find(units, {base10Value: sensor.unit});
    sensor.displayUnit = unit.description;

    var now = Date.now();
    var sensorChartData = await sails.helpers.getSensorChartData.with({
      sensorId,
      startsAt: now - 1000*60*5,//« past 5 minutes
      endsAt: now
    });
    // If we don't have any recent data, use the most recent 5 minutes of
    // sensor readings instead.
    if(sensorChartData.data.length === 0) {
      let mostRecentSensorReadings = await SensorReading.find().sort('measuredAt DESC').limit(1);
      if(mostRecentSensorReadings.length > 0) {
        let mostRecentSensorReading = mostRecentSensorReadings[0];
        // console.log('mostRecentSensorReading',mostRecentSensorReading);
        sensorChartData = await sails.helpers.getSensorChartData.with({
          sensorId,
          startsAt: mostRecentSensorReading.measuredAt - 1000*60*5,
          endsAt: mostRecentSensorReading.measuredAt
        });
      }
    }

    // Respond with view.
    return {
      currentSection: 'devices',
      device,
      sensor,
      sensorChartData,
    };

  }


};
