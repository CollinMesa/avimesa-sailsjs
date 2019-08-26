parasails.registerPage('add-alert', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    syncing: false,
    cloudError: '',

    formData: {},
    formRules: {},
    formErrors: {},
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.formData = {
      deviceId: this.device.deviceId,
      description: '',
      enableEmailNotifications: true,
      enableSMSNotifications: false,
      recipients: [],
      conditions: [{
        sensor: undefined,
        comparisonOperator: '<',
        value: undefined,
      }],
    };

    this._setFormRules();
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    submittedForm: function() {
      // Redirect to the users overview page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      window.location = '/devices/'+encodeURIComponent(this.device.deviceId);
    },

    clickAddCondition: async function() {
      this.formData.conditions.push({
        sensor: undefined,
        comparisonOperator: '<',
        value: undefined,
      });
      await this.forceRender();
    },

    clickRemoveCondition: async function(index) {
      this.formData.conditions.splice(index);
      await this.forceRender();
    },

    _setFormRules: function() {
      this.formRules = {
        description: {required: true},
        enableEmailNotifications: { custom: (value)=>(value || this.formData.enableSMSNotifications)},
        enableSMSNotifications: { custom: (value)=>(value || this.formData.enableEmailNotifications)},
        recipients: {custom: (value)=>value.length > 0},
        conditions: {
          custom: (value)=> {
            // There must be at least one condition
            if(value.length === 0) {
              return false;
            }
            // The condition must have a sensor and a value.
            else {
              return !_.any(value, (condition)=>_.isUndefined(condition.sensor) || _.isUndefined(condition.value));
            }
          }
        },
      };
    },
  }
});
