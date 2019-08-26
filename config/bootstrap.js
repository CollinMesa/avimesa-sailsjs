/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 1;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV==='production' || sails.config.models.migrate === 'safe') {
      sails.log('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "'+sails.config.environment+'" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return;
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v'+HARD_CODED_DATA_VERSION+' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ '+(new Date(lastRunBootstrapInfo.lastRunAt))+')');
      return;
    }//•

    sails.log('Running v'+HARD_CODED_DATA_VERSION+' bootstrap script...  ('+(lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v'+lastRunBootstrapInfo.lastRunVersion+' @ '+(new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer')+')');
  }
  else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞

  // By convention, this is a good place to set up fake data during development.
  var users = await User.createEach([
    { emailAddress: 'admin@example.com', fullName: 'Ken Bolt', phone: '', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('abc123') },
    { emailAddress: 'pfv@example.com', fullName: 'P. Franken Vandermelt', phone: '555-444-3232', password: await sails.helpers.passwords.hashPassword('abc123') },
    { emailAddress: 'danny@example.com', fullName: 'Danny Bolt', phone: '', password: await sails.helpers.passwords.hashPassword('abc123') },
    { emailAddress: 'jordy@example.com', fullName: 'Jordy Smith', phone: '555-222-1212', password: await sails.helpers.passwords.hashPassword('abc123') },
  ]).fetch();

  if(sails.config.custom.avimesaTestDeviceId) {
    let tempSensor = await Sensor.create({ name: 'BL2010BG Temperature', deviceId: sails.config.custom.avimesaTestDeviceId, unit: 17, channelIndex: 1, locationDescription: 'Inside the blender', measurementDisplayName: 'Temperature (F)', maxReading: 300, minReading: 0, }).fetch();
    let tempSensorReadingsToCreate = await sails.helpers.getTempSensorReadingSeedData(sails.config.custom.avimesaTestDeviceId, tempSensor.id);
    await SensorReading.createEach(tempSensorReadingsToCreate);
    let ampSensor = await Sensor.create({ name: 'BL2010BG Amperage', deviceId: sails.config.custom.avimesaTestDeviceId, unit: 2, channelIndex: 2, locationDescription: 'On the plug', measurementDisplayName: 'Amperage (AC)', maxReading: 100, minReading: 0, }).fetch();
    let ampSensorReadingsToCreate = await sails.helpers.getTempSensorReadingSeedData(sails.config.custom.avimesaTestDeviceId, ampSensor.id);
    await SensorReading.createEach(ampSensorReadingsToCreate);

    var pfv = _.find(users, {emailAddress: 'pfv@example.com'});
    var jordy = _.find(users, {emailAddress: 'jordy@example.com'});
    var danny = _.find(users, {emailAddress: 'danny@example.com'});
    var tempAlert = await Alert.create({
      description: 'BL2010BG temperature is perfect',
      deviceId: sails.config.custom.avimesaTestDeviceId,
      enableEmailNotifications: true,
      enableSMSNotifications: false,
      recipients: [jordy.id, danny.id],
    });
    await AlertCondition.createEach([
      {comparisonOperator: '>', value: 35, sensor: tempSensor.id, alert: tempAlert.id},
      {comparisonOperator: '<', value: 48, sensor: tempSensor.id, alert: tempAlert.id},
    ]);
    var ampAlert = await Alert.create({
      description: 'BL2010BG might be on fire? (temperature weirdly high without significant power consumption)',
      deviceId: sails.config.custom.avimesaTestDeviceId,
      enableEmailNotifications: true,
      enableSMSNotifications: false,
      recipients: [pfv.id, jordy.id, danny.id],
    });
    await AlertCondition.createEach([
      {comparisonOperator: '>', value: 150, sensor: tempSensor.id, alert: ampAlert.id},
      {comparisonOperator: '<', value: 350, sensor: ampSensor.id, alert: ampAlert.id},
    ]);

    // Compile + upload files for our test device.
    await sails.helpers.compileAndTransloadDeviceFiles(sails.config.custom.avimesaTestDeviceId);
  }

  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
  .tolerate((err)=>{
    sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
  });

};
