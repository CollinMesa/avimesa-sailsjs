module.exports = {


  friendlyName: 'Update one alert',


  description: '',


  inputs: {

    id: {
      required: true,
      type: 'number',
      description: 'The ID of the alert to update.',
    },

    description: {
      type: 'string',
      extendedDescription: 'aka "Alert name"',
      required: true
    },

    enableEmailNotifications: {
      type: 'boolean'
    },

    enableSMSNotifications: {
      type: 'boolean'
    },

    recipients: {
      type: ['number'],
      description: 'A non-empty array of user ids.',
      custom: (recipients) => recipients.length > 0 && recipients.every((num)=> _.isNumber(num) && num > 0 && num <= Number.MAX_SAFE_INTEGER && Math.floor(num) === num)
    },

    conditions: {
      required: true,
      description: 'The conditions under which this alert will trigger.',
      type: [
        {
          comparisonOperator: 'string',// « either "<" or ">"
          value: 'number',// « bound
          sensor: 'number'// « sensor ID
        }
      ],
    }

  },


  exits: {
    success: { description: 'Alert was updated successfully.' },
    notFound: { responseType: 'notFound' },
  },


  fn: async function ({ id, description, enableEmailNotifications, enableSMSNotifications, recipients, conditions }) {

    var alert = await Alert.findOne({id});
    if(!alert) {
      throw 'notFound';
    }

    if (recipients.length !== await User.count({ id: {in:_.pluck(recipients, 'id')} })) {
      throw 'recipientNotFound';
    }

    if (conditions.length !== await Sensor.count({ id: {in:_.pluck(conditions, 'sensor')} })) {
      throw 'sensorNotFound';
    }

    let { deviceId } = await Alert.updateOne({id})
    .set({
      description,
      enableEmailNotifications,
      enableSMSNotifications,
      recipients,
      conditions: []// « wipe all existing conditions (we recreate them below)
    })
    .fetch();

    await AlertCondition.createEach(
      conditions.map((condition) => Object.assign(condition, {
        alert: id
      }))
    );

    await sails.helpers.compileAndTransloadDeviceFiles(deviceId);

  }


};
