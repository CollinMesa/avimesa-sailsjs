module.exports = {


  friendlyName: 'Get temp sensor reading seed data',


  description: '',


  inputs: {

    deviceId: {
      type: 'string',
    },

    sensorId: {
      type: 'number',
    },

  },


  exits: {

    success: {
      outputFriendlyName: 'Sensor reading data',
    },

  },


  fn: async function ({deviceId, sensorId}) {
    var seedData = [
      {
        channelIndex: 1,
        units: 17,
        value: 75.65625,
        measuredAt: 1565714728000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.58125,
        measuredAt: 1565714735000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.7875,
        measuredAt: 1565714742000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.5625,
        measuredAt: 1565714749000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.525,
        measuredAt: 1565714756000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.7875,
        measuredAt: 1565714762000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.50625,
        measuredAt: 1565714769000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.7875,
        measuredAt: 1565714776000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.65625,
        measuredAt: 1565714783000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.88125,
        measuredAt: 1565714790000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.73125,
        measuredAt: 1565714797000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.4125,
        measuredAt: 1565714803000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.75,
        measuredAt: 1565714810000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.58125,
        measuredAt: 1565714817000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.5625,
        measuredAt: 1565714839000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.6375,
        measuredAt: 1565714846000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.50625,
        measuredAt: 1565714853000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.50625,
        measuredAt: 1565714860000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.58125,
        measuredAt: 1565714866000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.6,
        measuredAt: 1565714873000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.6375,
        measuredAt: 1565714880000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.4875,
        measuredAt: 1565714887000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.73125,
        measuredAt: 1565714894000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.6,
        measuredAt: 1565714900000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.75,
        measuredAt: 1565714907000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.73125,
        measuredAt: 1565714914000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 75.80625,
        measuredAt: 1565714921000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 70.36875,
        measuredAt: 1565714928000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 70.9125,
        measuredAt: 1565714935000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 70.44375,
        measuredAt: 1565714941000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 63.075,
        measuredAt: 1565714948000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 60.28125,
        measuredAt: 1565714955000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 45.61875,
        measuredAt: 1565714962000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 34.725,
        measuredAt: 1565714969000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 29.475,
        measuredAt: 1565714976000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 26.475,
        measuredAt: 1565714983000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 24.4875,
        measuredAt: 1565714989000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 22.93125,
        measuredAt: 1565714997000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 21.28125,
        measuredAt: 1565715003000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 22.65,
        measuredAt: 1565715028000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 23.325,
        measuredAt: 1565715034000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 44.925,
        measuredAt: 1565715041000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 38.55,
        measuredAt: 1565715048000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3875,
        measuredAt: 1565715075000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.425,
        measuredAt: 1565715081000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.5,
        measuredAt: 1565715088000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.51875,
        measuredAt: 1565715095000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.5,
        measuredAt: 1565715102000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.29375,
        measuredAt: 1565715109000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.21875,
        measuredAt: 1565715116000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.2375,
        measuredAt: 1565715126000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.1625,
        measuredAt: 1565715134000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.81875,
        measuredAt: 1565715141000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.44375,
        measuredAt: 1565715148000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3875,
        measuredAt: 1565715155000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.89375,
        measuredAt: 1565715162000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 32.00625,
        measuredAt: 1565715168000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.70625,
        measuredAt: 1565715175000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.125,
        measuredAt: 1565715197000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.125,
        measuredAt: 1565715204000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3875,
        measuredAt: 1565715211000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3125,
        measuredAt: 1565715218000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.36875,
        measuredAt: 1565715224000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.21875,
        measuredAt: 1565715231000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.21875,
        measuredAt: 1565715238000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3875,
        measuredAt: 1565715245000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.35,
        measuredAt: 1565715252000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.2,
        measuredAt: 1565715259000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.275,
        measuredAt: 1565715266000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 30.05625,
        measuredAt: 1565715290000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 30.69375,
        measuredAt: 1565715296000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.5,
        measuredAt: 1565715303000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3125,
        measuredAt: 1565715310000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 30.8625,
        measuredAt: 1565715317000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.2,
        measuredAt: 1565715324000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3875,
        measuredAt: 1565715331000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.575,
        measuredAt: 1565715338000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.14375,
        measuredAt: 1565715345000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.29375,
        measuredAt: 1565715351000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.36875,
        measuredAt: 1565715358000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3875,
        measuredAt: 1565715365000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.275,
        measuredAt: 1565715372000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.425,
        measuredAt: 1565715379000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.29375,
        measuredAt: 1565715387000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.3125,
        measuredAt: 1565715393000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.2,
        measuredAt: 1565715400000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.35,
        measuredAt: 1565715407000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.275,
        measuredAt: 1565715414000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.125,
        measuredAt: 1565715421000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 30.9375,
        measuredAt: 1565715427000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.36875,
        measuredAt: 1565715434000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.21875,
        measuredAt: 1565715441000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.06875,
        measuredAt: 1565715448000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.35,
        measuredAt: 1565715455000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.1625,
        measuredAt: 1565715463000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.05,
        measuredAt: 1565715470000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.425,
        measuredAt: 1565715476000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.21875,
        measuredAt: 1565715483000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.29375,
        measuredAt: 1565715490000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.1625,
        measuredAt: 1565715497000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.275,
        measuredAt: 1565715504000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.275,
        measuredAt: 1565715510000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.5,
        measuredAt: 1565715517000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.275,
        measuredAt: 1565715524000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.44375,
        measuredAt: 1565715531000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.1625,
        measuredAt: 1565715538000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.275,
        measuredAt: 1565715545000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 30.91875,
        measuredAt: 1565715552000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.14375,
        measuredAt: 1565715559000,
      },
      {
        channelIndex: 1,
        units: 17,
        value: 31.35,
        measuredAt: 1565715583000,
      }
    ];

    for(let sensorReading of seedData) {
      sensorReading.deviceId = deviceId;
      sensorReading.sensor = sensorId;
    }

    // Send back the result.
    return seedData;

  }


};

