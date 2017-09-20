import Ember from 'ember';

const { Component, run, isBlank, $, inject, computed, getOwner } = Ember;

export default Component.extend({
  scroller: inject.service(),

  didInsertElement() {
    run.scheduleOnce('afterRender', this, this.handleHeroHeight);
    this.get('orientation').on('tilt', this.handleHeroHeight.bind(this));
    this.get('resizeService').on('didResize', this.handleHeroHeight.bind(this));
  },

  imageLetters: 'abcdefghijklmnopqrst'.split(''),

  images: computed('imageLetters.[]', function() {
    return this.get('imageLetters').map((letter) => {
      let config = getOwner(this).resolveRegistration('config:environment');
      let startsWith = config.environment === 'production' ? 'https://d6kj2kjnxtaea.cloudfront.net/' : '';
      return {
        src: `${startsWith}assets/images/wedding-${letter}${window.ASSET_FINGERPRINT_HASH}.png`,
        w: 600,
        h: 600,
        title: 'Our photos'
      };
    });
  }),

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
      $hero.css('height', browserHeight - toolbarHeight);
    }
  },

  scrollToOurWeddingAnchor() {
    this.get('scroller').scrollVertical(this.$('#our-wedding'), { offset: -64 });
  }
});
