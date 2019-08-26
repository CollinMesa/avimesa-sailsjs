module.exports = {


  friendlyName: 'Get notification display recipients',


  description: '',


  inputs: {

    recipients: {
      type: 'ref',
    },

  },


  exits: {

    success: {
      outputType: 'string',
      outputFriendlyName: 'Notification "display recipients".',
    },

  },


  fn: async function ({recipients}) {

    // Get notification display recipients.
    var notificationDisplayRecipients;
    switch(recipients.length) {
      case 0:
        notificationDisplayRecipients = 'No one';
        break;
      case 1:
        notificationDisplayRecipients = recipients[0].fullName;
        break;
      case 2 :
        let recipientNames = _.pluck(recipients, 'fullName');
        notificationDisplayRecipients = recipientNames.join(' and ');
        break;
      default:
        let firstRecipientName = recipients[0].fullName;
        let otherRecipientTotal = recipients.length - 1;
        notificationDisplayRecipients = `${firstRecipientName} + ${otherRecipientTotal} other${otherRecipientTotal === 1 ? '' : 's'}`;
        break;
    }

    // Send back the result.
    return notificationDisplayRecipients;

  }


};

