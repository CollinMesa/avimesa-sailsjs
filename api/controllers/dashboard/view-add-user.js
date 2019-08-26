module.exports = {


  friendlyName: 'View add user',


  description: 'Display "Add user" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/add-user'
    }

  },


  fn: async function () {

    // Respond with view.
    return {
      currentSection: 'users',
    };
  }


};
