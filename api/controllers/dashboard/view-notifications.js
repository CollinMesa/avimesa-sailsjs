module.exports = {


  friendlyName: 'View notifications',


  description: 'Display "Notifications" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/notifications'
    }

  },


  fn: async function () {
    var notificationTotal = await Notification.count();

    // Show last 50 notifications
    var notifications = await Notification.find()
    .populate('alert')
    .sort('createdAt DESC')
    .limit(50);
    for (let notification of notifications) {
      notification.displayChannels = notification.channels.join(', ');
      notification.displayRecipients = await sails.helpers.getNotificationDisplayRecipients(notification.recipients);
    }

    // Respond with view.
    return {
      currentSection: 'notifications',
      notificationTotal,
      notifications
    };

  }


};
