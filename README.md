# avimesa-seed

A [Sails v1](https://sailsjs.com) application.




### Demo users

TO DO

### First-time setup

To get started developing locally, clone this project and `cd` into its top-level folder.
Also, make sure you're running Node >= 8, with Sails >= 1 installed globally.

Before running the project locally for the first time, run:

```bash
npm install
```
Then, you'll need to configure your app with your Avimesa credentials. In your app's `config/custom.js` file, fill in `avimesaApiKey` with your API key, and `avimesaApiPassword` with your API password. You can also configure items under `Display names/dates for your app` to automatically replace all instances of `NEW_APP_NAME`, etc with your own brand and dates.

> Don't have Avimesa credentials yet? Request a developer account [here](https://avimesa.com/request-developer-account).

If you have an Avimesa test device and would like to seed your app with some example sensor data, you'll also want to fill in `avimesaTestDeviceId` with the ID of your test device.

> The test device data will be automatically configured with sensors on channels 1 and 2. If the sensors on your Avimesa 1000 are configured elsewhere, you'll want to leave this out and maually add your sensors from the dashboard.

> Be sure to also update items under `Display names/dates for your app` in `config/custom.js` to automatically update 

Now that you've configured your app, you're ready to start the server for local development. Just run:

```bash
sails lift
```

If you see a sailboat, congratulations!  Your app should now be available on http://localhost:1337.

> ##### Troubleshooting tips
> - If you see "command not found", run `npm install -g sails` to install the Sails command line tool.
> - If you see "EACCES" or "permission denied" when installing the Sails command-line tool on a `*`nix operating system, try doing `sudo chmod -R ugo+rwx /usr/local/lib`
> - Use `<CTRL> + C` lowers the local server.

### Deploying to a cloud server
You can deploy this app to any platform that supports Node.js. Here's a way to deploy it to [Heroku](http://heroku.com) as an example:

1. Create **Heroku** & **GitHub** accounts, sign in to both.
2. **Heroku dashboard**: click **new > create new pipeline.**
3. Name the pipeline & connect your **GitHub** repo (select your org, search for the repo).
4. **Pipeline dashboard**: click **Add app...** under Staging - create new, name it - **create new app.**
5. Go to **Staging > Overview > Configure Add-ons.**
6. Search for and add the following: **Heroku Scheduler** - **JawsDB MySQL** - **Papertrail** - **Redis To Go.**
7. Go to **Staging > Settings > Reveal Config Vars** - add the following:
- sails_environment = `staging`
- sails_session_url = _copy/paste pre-filled REDISTOGO_URL here_
- sails_sockets_url = _same Redis to Go URL_
- TZ = customize the timezone used in your Papertrail logs _e.g. America/California_
- sails_datastores__default__adapter = `sails-sql`
- sails_datastores__default__url = _copy/paste pre-filled JAWSDB_URL here_
- sails_log__level = `info`
- sails_custom__avimesaApiKey = _your Avimesa API key_
- sails_custom__avimesaApiPassword = _your Avimesa API password_
- sails_custom__avimesaHostname = _your Avimesa Hostame url_
- sails_custom__avimesaTestDeviceId = _your Avimesa Device ID_
8. Go to **Staging > Deploy > Automatic deploys**: Set branch to "deploy" and "Enable".
9. Go to **Open App** and copy your staging url.
10. Open `config/env/staging.js` in your project: add your staging url to `onlyAllowOrigins` and `baseUrl` (no trailing slash).
11. Open **Terminal**, navigate to your **GitHub** repo & run `npm install sails-sql` (push up `package-lock.json` & `package.json` after).
12. Double check everything is saved/pushed up & run `sails run deploy`
13. Wait for the staging deploy to finish in **Heroku**, open your staging url.
14. Enjoy your deployed app!


### Deploying to production
You can deploy this app to any platform that supports Node.js. Here's a way to deploy it to [Heroku](http://heroku.com) as an example:

1. Complete the Staging deploy above first & go to your **Pipeline dashboard.**
2. Click **Add app...** under Production - create new, name it - **create new app.**
3. Go to **Production > Overview > Configure Add-ons.**
4. Search for and add the following: **Heroku Scheduler** - **JawsDB MySQL** - **Papertrail** - **Redis To Go.**
5. Go to **Production > Settings > Reveal Config Vars** - add the following:
- sails_environment = `production`
- sails_session_url = _copy/paste pre-filled REDISTOGO_URL here_
- sails_sockets_url = _same Redis to Go URL_
- TZ = add timezone _e.g. America/California_
- sails_datastores__default__adapter = `sails-sql`
- sails_datastores__default__url = _copy/paste pre-filled JAWSDB_URL here_
- sails_log__level = `info`
- sails_custom__avimesaApiKey = _Avimesa API key_
- sails_custom__avimesaApiPassword = _Avimesa API passwordv
- sails_custom__avimesaHostname = _Avimesa Hostame urlv
- sails_custom__avimesaTestDeviceId = _Avimesa Device ID_
6. Go to **Open App** and copy your production url.
7. Open `config/env/production.js` in your project: add your production url to `onlyAllowOrigins` and `baseUrl` (no trailing slash).
8. In `config/env/production.js` uncomment the following:
- `adapter: '@sailshq/connect-redis',` under session and sockets
- `adapter` under datastores default and make it: `adapter: 'sails-sql'`
- `trustProxy: true,` under http.
9. Double check everything is saved/pushed up & run `sails run deploy` which deploys these changes to staging first.
10. Wait for the staging deploy to finish, then click **Promote to Production**, & open your production url.
11. Enjoy your deployed app!

### Production database migrations
You can migrate your DB to any platform that supports it. Here's a way to migrate your local DB / bootstrap to JawsDB MySQL in Heroku as an example:

1. Open Terminal, navigate to your GitHub repo and paste the following but don't submit just yet:
```
sails_datastores__default__adapter=sails-sql sails_datastores__default__url=MYSQL_URL_GOES_HERE sails console --drop
```
2. Replace `MYSQL_URL_GOES_HERE` with the full SQL url from your **JawsDB MySQL** in Staging and submit.
3. Kill your sails console & run `sails console --drop` to reset your local DB.
4. Replace `MYSQL_URL_GOES_HERE` with the full SQL url from your **JawsDB MySQL** in Production and submit.
5. Kill your sails console and run `sails console --drop` to reset your local DB again.
6. Verify staging & production DB migrations were successful with [Sequel Pro](https://www.sequelpro.com) and/or their **Heroku** urls.

### Links

+ [Avimesa user guide](https://github.com/Avimesa/user-guide-group-api-amqp)
+ [Sails docs / get started](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)
+ [Jerryscript docs / get started](https://github.com/jerryscript-project/jerryscript/blob/master/docs/00.GETTING-STARTED.md)
+ [Node.js](https://nodejs.org)



### Version info

This app was originally generated on Tue Jul 02 2019 17:30:45 GMT-0500 (Central Daylight Time) using Sails v1.2.3.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->


This project's boilerplate is based on an expanded seed app provided by the [Sails core team](https://sailsjs.com/about) to make it easier for you to build on top of ready-made features like authentication, enrollment, email verification, and billing.  For more information, [drop us a line](https://sailsjs.com/support).


<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

