module.exports = {


  friendlyName: 'Update one user',


  description: 'Edit an existing user account',


  inputs: {

    id: {
      required: true,
      type: 'number',
      description: 'The ID for the user to destroy.',
    },

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    fullName:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    },

    phone: {
      type: 'string',
      description: 'The phone number of this user.',
      example: '2223334444'
    },

  },


  exits: {

    notFound: {
      responseType: 'notFound'
    },

  },


  fn: async function ({id, emailAddress, fullName, phone}) {
    let userExists = await User.count({id: id});
    if(!userExists) {
      throw 'notFound';
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // FUTURE: Could potentially add a permissions check here,
    // e.g. if you only want to allow users with `isSuperAdmin: true`
    // to update other users.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Update the user's info.
    await User.updateOne({id: id})
    .set({
      emailAddress,
      fullName,
      phone
    });

    // TODO: do we want to handle email confirmation like we do in "update profile"?

  }


};
