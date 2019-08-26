module.exports = {


  friendlyName: 'View users overview',


  description: 'Display "Users overview" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/users-overview'
    }

  },

  fn: async function () {
    var users = await User.find({});
    // Respond with view.
    return {
      currentSection: 'users',
      users
    };
  }
};
