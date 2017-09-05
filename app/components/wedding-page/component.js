import Ember from 'ember';

const { Component, run, isBlank, $ } = Ember;

export default Component.extend({
  didInsertElement() {
    run.scheduleOnce('afterRender', this, this.handleHeroHeight);
    this.get('orientation').on('tilt', this.handleHeroHeight.bind(this));
    this.get('resizeService').on('didResize', this.handleHeroHeight.bind(this));
  },

  handleHeroHeight() {
    this._handleHeroHeight(this.get('initialHeroHeight'));
  },

  _handleHeroHeight(overrideHeroHeight) {
    let toolbarHeight = $('md-toolbar').outerHeight();
    let $hero = this.$('.js-hero');
    let heroHeight = overrideHeroHeight || $hero.outerHeight();
    if (isBlank(overrideHeroHeight)) {
      this.set('initialHeroHeight', heroHeight);
    }
    let browserHeight = $(window).height();
    if ((toolbarHeight + heroHeight) < browserHeight) {
      $hero.css('height', browserHeight);
    }
  },
});
