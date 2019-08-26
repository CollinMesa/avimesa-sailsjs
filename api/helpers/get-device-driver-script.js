module.exports = {


  friendlyName: 'Get device driver script',


  description: '',


  inputs: {

    deviceId: {
      type: 'string',
      required: true
    },

  },


  exits: {

    success: {
      outputFriendlyName: 'Device driver script',
    },

  },


  fn: async function ({deviceId}) {


    var sensors = await Sensor.find({deviceId: deviceId}).sort('channelIndex ASC');
    var sensorListFormattedForDeviceDriverScript = _.reduce(sensors, (memo, sensor)=>{
      // m = (y2 - y1) / (x2 - x1)
      // y2 = ?      (?; max (desired) sensor reading)
      // y1 = ?      (?; min sensor reading)
      // x2 = .02    (Amps; max (actual) sensor output)
      // x1 = .004   (Amps; min sensor output)
      let mVal = (sensor.maxReading - sensor.minReading) / (0.02 - 0.004);
      // b = y - mx
      let bVal = sensor.maxReading - (mVal * 0.02);
      let sensorInfo = {
        'chan_idx': sensor.channelIndex,
        'unit_idx':  sensor.unit,
        'm_val': mVal,
        'b_val': bVal
      };
      memo = memo + ' '+' '+JSON.stringify(sensorInfo)+',\n';
      return memo;
    }, `[\n`);
    sensorListFormattedForDeviceDriverScript += `]`;


    let relevantAlerts = await Alert.find({deviceId});
    let relevantConditions = await AlertCondition.find({
      alert: {in:_.pluck(relevantAlerts, 'id')}
    })
    .populate('sensor');

    let alertingJs = relevantAlerts.reduce((memo, alert)=>{
      // e.g. "dev_in.dev.chans[1].ch_data[0].val < 20"
      let conditionJs = _.where(relevantConditions, {alert: alert.id}).reduce((memo, condition)=>{
        return memo + ` && dev_in.dev.chans[${condition.sensor.channelIndex}].ch_data[0].val ${condition.comparisonOperator} ${condition.value}`;
      }, 'true');
      memo += `
  if (${conditionJs}) {
    avmsaSendToNotificationQueue();
  }
`;
      return memo;
    }, '');

    let deviceDriverScriptJs = (`
var AVI_ENG_UNIT_AMPS_DC = 1;
var aviSensorList = ${sensorListFormattedForDeviceDriverScript};

/**@brief Processes raw 4-20mA channels
 *
 * @details This function will translate the raw 4-20mA channel readings
 *          into the processed values and enqueue the datum
 *
 * @param[in] avi_object - the avi_object
 *
 * @returns none
 */
function processRawTo420(dev_in) {
  if (dev_in != null && dev_in.dev != null) {
    if (dev_in.dev.chans != null) {
      for (var i = 0; i < aviSensorList.length; i++) {
        var channel = dev_in.dev.chans[aviSensorList[i].chan_idx];
        if (channel != undefined && channel != null && channel.ch_data[0].units == AVI_ENG_UNIT_AMPS_DC) {
          if (channel.ch_data[0].val < .004 || channel.ch_data[0].val > .02) {
            channel.ch_data[0].val = null;
            channel.ch_data[0].units = aviSensorList[i].unit_idx;
          }
          else {
            channel.ch_data[0].val = aviSensorList[i].m_val * channel.ch_data[0].val + aviSensorList[i].b_val;
            channel.ch_data[0].units = aviSensorList[i].unit_idx;
          }
        }
      }
    }
  }
}

/**@brief Entry point for Device Driver Script
 *
 * @returns none
 */
function avmsaMain(){

  // translate
  processRawTo420(dev_in);

  // If appropriate, write to notification queue to trigger alerts.${alertingJs}

  // Send the 'dev_in' data to the raw queue
  avmsaSendToRawQueue();

  // Get the next actuation message (if any) and relay to device
  dev_out.actuation = avmsaGetNextActuationMsg();
}
`
    );

    sails.log.silly(
`Compiled device driver script:
==============================
${deviceDriverScriptJs}
`
    );

    return deviceDriverScriptJs;

  }


};

