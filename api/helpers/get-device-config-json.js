module.exports = {


  friendlyName: 'Get avimesa device config JSON',


  description: 'Get the auto-generated config JSON for an Avimesa device.',


  extendedDescription: 'The config will be generated based on the sensors that have been configured for the device.',


  inputs: {

    deviceId: {
      type: 'string',
      required: true
    },

  },


  exits: {

    success: {
      outputFriendlyName: 'Avimesa device config',
    },

  },


  fn: async function ({deviceId}) {

    var deviceConfig = {
      'api_maj': 0,
      'api_min': 10,
      dts: Math.floor(Date.now()/1000),
      dev: {
        'dev_id':'00000000000000000000000000000000',//« this doesn't work if you use the device ID
        'dev_cfg': { 'heartbeat':0 },
        chans: [
          {'ch_idx':0,'ch_cfg':{'ch_type':1,'en':0,'sched':1,'sensor':{'settling_time':0}}},
          {'ch_idx':1,'ch_cfg':{'ch_type':1,'en':0,'sched':1,'sensor':{'settling_time':0}}},
          {'ch_idx':2,'ch_cfg':{'ch_type':1,'en':0,'sched':1,'sensor':{'settling_time':0}}},
          {'ch_idx':3,'ch_cfg':{'ch_type':1,'en':0,'sched':1,'sensor':{'settling_time':0}}},
          {'ch_idx':4,'ch_cfg':{'ch_type':1,'en':0,'sched':1,'sensor':{'settling_time':0}}},
          {'ch_idx':5,'ch_cfg':{'ch_type':1,'en':0,'sched':1,'sensor':{'settling_time':0}}},
          {'ch_idx':6,'ch_cfg':{'ch_type':1,'en':0,'sched':1,'sensor':{'settling_time':0}}},
          {'ch_idx':7,'ch_cfg':{'ch_type':1,'en':0,'sched':1,'sensor':{'settling_time':0}}},
          {'ch_idx':8,'ch_cfg':{'ch_type':256,'en':0,'sched':1,'sensor':{'sens_flags':4097}}},
          {'ch_idx':9,'ch_cfg':{'ch_type':256,'en':0,'sched':1,'sensor':{'sens_flags':4097}}},
          {'ch_idx':10,'ch_cfg':{'ch_type':256,'en':0,'sched':1,'sensor':{'sens_flags':4097}}},
          {'ch_idx':11,'ch_cfg':{'ch_type':256,'en':0,'sched':1,'sensor':{'sens_flags':4097}}},
          {'ch_idx':12,'ch_cfg':{'ch_type':256,'en':0,'sched':1,'sensor':{'sens_flags':4097}}},
          {'ch_idx':13,'ch_cfg':{'ch_type':256,'en':0,'sched':1,'sensor':{'sens_flags':4097}}},
          {'ch_idx':14,'ch_cfg':{'ch_type':256,'en':0,'sched':1,'sensor':{'sens_flags':4097}}},
          {'ch_idx':15,'ch_cfg':{'ch_type':256,'en':0,'sched':1,'sensor':{'sens_flags':4097}}}
        ]
      }
    };

    var sensors = await Sensor.find({deviceId: deviceId}).sort('channelIndex ASC');
    for(let sensor of sensors) {
      let channel = _.find(deviceConfig.dev.chans, {'ch_idx': sensor.channelIndex});
      // Enable this sensor's channel.
      channel.ch_cfg.en = 1;
      // Set the settling time.
      channel.ch_cfg.sensor['settling_time'] = sensor.settlingTime;
    }

    // Now make sure all unused channels in between the enabled ones
    // are also enabled.
    if(sensors.length > 0) {
      let highestEnabledChannelIdx = _.last(sensors).channelIndex;
      for(let channel of deviceConfig.dev.chans) {
        if(channel['ch_cfg'].en === 0 && channel['ch_idx'] < highestEnabledChannelIdx) {
          channel['ch_cfg'].en = 1;
          // TODO: maybe set settling time too if it needs that.
        }
      }
    }

    return deviceConfig;

  }


};

