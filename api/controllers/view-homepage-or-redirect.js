module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate page, depending on login status.',


  exits: {

    redirect: {
      responseType: 'redirect',
    },

  },


  fn: async function () {

    if (this.req.me) {
      throw {redirect:'/notifications'};
    }

    throw {redirect: '/login'};

  }


};
