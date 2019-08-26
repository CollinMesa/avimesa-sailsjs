module.exports = {


  friendlyName: 'Destroy one user',


  description: 'Archive a user record.',


  inputs: {

    id: {
      required: true,
      type: 'number',
      description: 'The ID of the user to destroy.',
    },

  },


  exits: {

  },


  fn: async function ({id}) {

    if(id === this.req.me.id) {
      throw new Error('You cannot delete yourself!');
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // FUTURE: Could potentially add a permissions check here,
    // e.g. if you only want to allow users with `isSuperAdmin: true`
    // to delete other users.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // We'll use `archiveOne` so the original record data will still exist
    // as an `archive` record.
    await User.archiveOne({id});

  }


};
