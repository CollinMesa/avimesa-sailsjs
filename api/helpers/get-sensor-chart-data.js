module.exports = {


  friendlyName: 'Get sensor chart data',


  description: 'Get sensor data formatted for plugging into a chart.',


  inputs: {

    sensorId: {
      type: 'string',
      description: 'The ID of the sensor in our database',
      required: true,
    },

    startsAt: {
      type: 'number',
      description: 'JS timestamp representing the earliest sensor reading to use.',
      required: true,
    },

    endsAt: {
      type: 'number',
      description: 'JS timestamp representing the latest sensor reading to use.',
      required: true,
    },

  },


  exits: {

    success: {
      outputFriendlyName: 'Sensor chart data',
    },

  },


  fn: async function ({sensorId, startsAt, endsAt}) {
    var moment = require('moment');

    // Get sensor chart data.
    var sensorChartData = {
      data: [],
      labels: [],
    };

    // Get recent sensor readings
    var sensorReadings = await SensorReading.find({
      sensor: sensorId,
      and: [
        { measuredAt: {'>=': startsAt }},
        { measuredAt: {'<=': endsAt }},
      ]
    }).sort('measuredAt ASC');

    for(let reading of sensorReadings) {
      sensorChartData.data.push(reading.value);
      sensorChartData.labels.push(moment(reading.measuredAt).format('HH:mm:ss'));
      // ^^ future: make the labels less specific depending on timeframe
      // (e.g. if it's >= 1 day, show hourly, if it's >= 1 hour, show minutes w/o seconds
    }

    // Send back the result through the success exit.
    return sensorChartData;

  }


};

