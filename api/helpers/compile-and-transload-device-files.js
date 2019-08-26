module.exports = {


  friendlyName: 'Compile and transload device files',


  description: '',


  inputs: {

    deviceId: {
      type: 'string',
      required: true
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({deviceId}) {
    var path = require('path');

    // Determine output path, and create a new folder to hold our files.
    var outputFolderPath = path.resolve(
      sails.config.appPath,
      '.tmp',
      `device-config-${deviceId}-${Date.now()}`
    );
    await sails.helpers.fs.mkdir(outputFolderPath);

    // Grab the device config JSON
    var deviceConfig = await sails.helpers.getDeviceConfigJson(deviceId);
    // Write our config JSON to a file.
    var configDestination = path.resolve(
      outputFolderPath,
      'config.json'
    );
    await sails.helpers.fs.write(configDestination, JSON.stringify(deviceConfig));
    // Upload config file
    await sails.helpers.avimesa.uploadAvimesaDeviceConfig(deviceId, configDestination);
    // Compile device driver code
    var deviceDriverScript = await sails.helpers.getDeviceDriverScript(deviceId);

    // Write device driver code to a file
    var scriptDestination = path.resolve(
      outputFolderPath,
      'script.js'
    );
    await sails.helpers.fs.write(scriptDestination, deviceDriverScript);
    // Upload device driver script
    await sails.helpers.avimesa.uploadAvimesaDeviceScript(deviceId, scriptDestination);

    // Clean up no-longer-necessary output folder
    await sails.helpers.fs.rmrf(outputFolderPath);

  }


};

