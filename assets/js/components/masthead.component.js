/**
 * <masthead>
 * -----------------------------------------------------------------------------
 * TODO: description
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('masthead', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝

  props: [],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
	  return {
      menuVisible: false,
      me: undefined,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
		<div>
			<!-- LOGGED-OUT NAVIGATION -->
			<header id="page-header" class="navbar navbar-expand-sm navbar-dark bg-dark justify-content-between mb-5" v-if="!me">
				<a class="navbar-brand mr-0" href="/"><img class="logo" alt="Avimesa logo" src="/images/avimesa-logo.png"/></a>
				<div class="navbar-nav flex-row">
          <a class="nav-item nav-link ml-2 ml-md-0 mr-2" href="/faq">FAQ</a>
          <a class="nav-item nav-link ml-2 ml-md-0 mr-2" href="/login">Log in</a>
        </div>
			</header>
			<!-- LOGGED-IN NAVIGATION -->
			<div v-else>
				<div class="logged-in-navbar">
					<a class="logged-in-nav-brand" href="/"><img class="logo" alt="Avimesa logo" src="/images/avimesa-logo-square.png"/></a>
					<button class="mobile-nav-button" @click="clickMenu()" @mousedown.prevent>
						<i class="fa fa-ellipsis-v"></i>
						<input data-focal-point type="button" aria-hidden="true" class="focal-point" @focus="focusFocalPoint()" @blur="blurFocalPoint()" readonly="readonly">
					</button>
					<div class="logged-in-nav">
						<div class="logged-in-user mb-3">
							<div class="app-name">
								<strong><a href="/">{{platformName}}</a></strong>
							</div>
							<div class="account-nav text-muted">
								<a href="/account" :class="currentSection === 'account' ? 'current-section' : ''"><strong>{{me.fullName}}</strong><span class="hover-icon">&nbsp;&nbsp;<i class="fa fa-angle-right"></i></span></a>
							</div>
						</div>
						<div class="section-nav">
							<a class="d-block" :class="currentSection === 'devices' ? 'current-section' : ''" href="/devices">Devices</a>
							<a class="d-block" :class="currentSection === 'notifications' ? 'current-section' : ''" href="/notifications">Notification history</a>
							<a class="d-block" :class="currentSection === 'users' ? 'current-section' : ''" href="/users">Users</a>
						</div>
					</div>
				</div>

				<!-- LOGGED-IN 'MOBILE' NAVIGATION MENU -->
				<div class="logged-in-nav-mobile container-fluid position-fixed px-0" id="mobile-navigation" v-if="menuVisible" @mousedown.prevent>
					<div class="bg-dark">
						<div class="row">
							<div class="col-5">
								<div class="logged-in-user p-3">
									<div class="app-name">
										<strong><a href="/">{{platformName}}</a></strong>
									</div>
									<div class="account-nav text-muted">
										<a href="/account" :class="currentSection === 'account' ? 'current-section' : ''"><strong>{{me.fullName}}</strong><span class="hover-icon">&nbsp;&nbsp;<i class="fa fa-angle-right"></i></span></a>
									</div>
								</div>
								<div class="section-nav p-3">
									<a class="d-block" :class="currentSection === 'devices' ? 'current-section' : ''" href="/devices">Devices</a>
									<a class="d-block" :class="currentSection === 'notifications' ? 'current-section' : ''" href="/notifications">Notification history</a>
									<a class="d-block" :class="currentSection === 'users' ? 'current-section' : ''" href="/users">Users</a>
								</div>
							</div>
							<div class="col-5">
								<div class="nav flex-column p-3">
									<a class="nav-item" href="/contact">Contact</a>
									<a class="nav-item" href="/legal/terms">Terms of service</a>
									<a class="nav-item" href="/legal/privacy">Privacy policy</a>
									<a class="nav-item" href="/logout">Sign out</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    // allow currentSection to be undefined, as for informational/legal pages
    this.currentSection = this.currentSection || undefined;

    this.isMobile = parasails.isMobile();
  },

  beforeDestroy: function() {},

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    clickMenu: function() {
      // If the menu is not visible, focus the focal point to display it.
      if(!this.menuVisible) {
        $(this.$el).find('[data-focal-point]').focus();
      }
      else {
        // Close the menu.
        // (This will probably happen anyway because of navigation, but just in case.)
        $(this.$el).find('[data-focal-point]').blur();
      }
    },

    focusFocalPoint: async function() {
      // Show the menu.
      this.menuVisible = true;
      await this.forceRender();
    },

    blurFocalPoint: async function() {
      // Hide the menu.
      this.menuVisible = false;
      await this.forceRender();
    },
  }
});
