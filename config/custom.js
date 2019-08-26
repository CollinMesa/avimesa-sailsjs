/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /**************************************************************************
  *                                                                         *
  * The base URL to use during development.                                 *
  *                                                                         *
  * • No trailing slash at the end                                          *
  * • `http://` or `https://` at the beginning.                             *
  *                                                                         *
  * > This is for use in custom logic that builds URLs.                     *
  * > It is particularly handy for building dynamic links in emails,        *
  * > but it can also be used for user-uploaded images, webhooks, etc.      *
  *                                                                         *
  **************************************************************************/
  baseUrl: 'http://localhost:1337',

  /**************************************************************************
  *                                                                         *
  * Display names/dates for your app                                        *
  *                                                                         *
  * > These are here to make it easier to change out the placeholder        *
  * > platform name, company name, etc. that are displayed all over the     *
  * > app when it's first generated.                                        *
  *                                                                         *
  **************************************************************************/
  // platformCopyrightYear: '2019',
  // platformName:  'NEW_APP_NAME',
  // platformCompanyName: 'NEW_APP_COMPANY_NAME',
  // platformCompanyAboutHref: 'https://sailsjs.com/about',
  // privacyPolicyUpdatedAt: 'DATE_PRIVACY_POLICY_LAST_UPDATED',
  // termsOfServiceUpdatedAt: 'DATE_TERMS_OF_SERVICE_LAST_UPDATED',
  platformCopyrightYear: '2019',
  platformName:  'Acme GDC',
  platformCompanyName: 'Acme Global Domination Corporation',
  platformCompanyAboutHref: 'https://sailsjs.com/about',
  privacyPolicyUpdatedAt: 'August 13, 2019',
  termsOfServiceUpdatedAt: 'August 13, 2019',

  /**************************************************************************
  *                                                                         *
  * The TTL (time-to-live) for various sorts of tokens before they expire.  *
  *                                                                         *
  **************************************************************************/
  passwordResetTokenTTL: 24*60*60*1000,// 24 hours
  emailProofTokenTTL:    24*60*60*1000,// 24 hours

  /**************************************************************************
  *                                                                         *
  * The extended length that browsers should retain the session cookie      *
  * if "Remember Me" was checked while logging in.                          *
  *                                                                         *
  **************************************************************************/
  rememberMeCookieMaxAge: 30*24*60*60*1000, // 30 days

  /**************************************************************************
  *                                                                         *
  * Automated email configuration                                           *
  *                                                                         *
  * Sandbox Mailgun credentials for use during development, as well as any  *
  * other default settings related to "how" and "where" automated emails    *
  * are sent.                                                               *
  *                                                                         *
  * (https://app.mailgun.com/app/domains)                                   *
  *                                                                         *
  **************************************************************************/
  mailgunDomain: 'sandboxe5f2d8f560054db983f3226bacf07f21.mailgun.org',
  mailgunSecret: '9dffbd93b6eb38656f3f04a54914751b-2b0eef4c-2c6a9a01',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for automated emails.
  // ||  (Important for password recovery, verification, contact form, etc.)
  //--------------------------------------------------------------------------

  // The sender that all outgoing emails will appear to come from.
  fromEmailAddress: 'acme@example.com',
  fromName: 'Acme Global Domination Corporation',

  // Email address for receiving support messages & other correspondences.
  // > If you're using the default privacy policy, this will be referenced
  // > as the contact email of your "data protection officer" for the purpose
  // > of compliance with regulations such as GDPR.
  internalEmailAddress: 'support@example.com',

  // Whether to require proof of email address ownership any time a new user
  // signs up, or when an existing user attempts to change their email address.
  verifyEmailAddresses: false,

  /**************************************************************************
  *                                                                         *
  * Avimesa configuration                                                   *                         *
  *                                                                         *
  **************************************************************************/
  avimesaHostname: 'rmqserv001.avimesa.com',
  avimesaApiKey: '8163568158b3455abcfad8ef27fb6f1e',
  avimesaApiPassword: '3003aee0876a41e0a001623e88e1f002',
  //--------------------------------------------------------------------------
  // /\  Configure these with your Avimesa API credentials.
  // ||  (Need an API key? visit https://avimesa.com/request-developer-account
  //--------------------------------------------------------------------------
  avimesaTestDeviceId: '03155bba612f46d69b9c69cf63ee76e8',
  //--------------------------------------------------------------------------
  // /\  Configure this to seed the app with sensor data for your test device.
  // ||  (If you don't have a test device, you can leave this empty.)
  //--------------------------------------------------------------------------


  /**************************************************************************
  *                                                                         *
  * Billing & payments configuration                                        *
  *                                                                         *
  * (https://dashboard.stripe.com/account/apikeys)                          *
  *                                                                         *
  **************************************************************************/
  // stripePublishableKey: 'pk_test_Zzd814nldl91104qor5911gjald',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for billing features.
  // ||  (Or if you don't need billing, feel free to remove them.)
  //--------------------------------------------------------------------------

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // …

};
