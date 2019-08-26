parasails.registerPage('device-detail', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    syncing: false,
    cloudError: '',

    modal:'',

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
    this._marshalAlerts();
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickRemoveAlert: function(alert) {
      this.formData = {
        id: alert.id,
        _alert: _.extend({}, alert)
      };
      this.modal = 'remove-alert';
    },

    closeModal: function() {
      this.modal = '';
      this.cloudError = '';
      this.formData = {};
      this.formRules = {};
      this.formErrors = {};
    },

    submittedRemoveAlert: function() {
      this.syncing = true;
      _.remove(this.alert, {id: this.formData.id});
      this.closeRemoveModal();
    },

    _marshalAlerts: function() {
      _.each(this.alerts, (alert)=>{
        alert.tooltipHtml = '';
        _.each(alert.recipients, (recipient, index)=>{
          alert.tooltipHtml += '<span>'+recipient.fullName+'</span>';
          console.log('index',index);
          if(index+1 < alert.recipients.length) {
            alert.tooltipHtml += '<br/>';
          }
        });
      });
    },

  }
});
