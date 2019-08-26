module.exports = {


  friendlyName: 'Create alert',


  description: '',


  inputs: {

    deviceId: {
      type: 'string',
      required: true,
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
    success: {
      description: 'New alert was created successfully.',
      outputFriendlyName: 'New alert ID',
      outputDescription: 'The ID of the newly-created alert.',
      outputType: 'number'
    },
    recipientNotFound: {
      description: 'One or more of the specified recipients does not exist as a user in the database.',
      responseType: 'badRequest'
    },
    sensorNotFound: {
      description: 'One or more of the sensors in the specified conditions does not exist in the database.',
      responseType: 'badRequest'
    }
  },


  fn: async function ({ deviceId, description, enableEmailNotifications, enableSMSNotifications, recipients, conditions }) {

    if (recipients.length !== await User.count({ id: {in: recipients} })) {
      throw 'recipientNotFound';
    }

    if (conditions.length !== await Sensor.count({ id: {in:_.pluck(conditions, 'sensor')} })) {
      throw 'sensorNotFound';
    }

    let { id: newAlertId } = await Alert.create({
      deviceId,
      description,
      enableEmailNotifications,
      enableSMSNotifications,
      recipients
    })
    .fetch();

    await AlertCondition.createEach(
      conditions.map((condition) => Object.assign(condition, {
        alert: newAlertId
      }))
    );

    await sails.helpers.compileAndTransloadDeviceFiles(deviceId);

    return newAlertId;

  }


};
