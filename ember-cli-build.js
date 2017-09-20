/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app'),
  writeFile = require('broccoli-file-creator'),
  md5 = require('md5');

module.exports = function(defaults) {
  const fingerprintHash = md5(Date.now());

  let app = new EmberApp(defaults, {
    fingerprint: {
      prepend: 'https://d6kj2kjnxtaea.cloudfront.net/',
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'json'], // list of extensions to fingerprint
      customHash: fingerprintHash //use a single fingeprint/hash for all assets
    },
    dotEnv: {
      clientAllowedKeys: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY']
    }
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  let assetFingerprintTree = writeFile('./assets/assets-fingerprint.js', `(function(_window){ _window.ASSET_FINGERPRINT_HASH = "${(app.env === 'production' ? `-${fingerprintHash}` : '')}"; })(window);`);

  return app.toTree(assetFingerprintTree);
};
