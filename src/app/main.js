/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
{
  baseUrl: '.',

  // Path mappings for the logical module names
  paths:
  //injector:mainReleasePaths
  {
    'knockout': 'libs/knockout/dist/knockout',
    'jquery': 'libs/jquery/dist/jquery',
    'jqueryui-amd': 'libs/jquery-ui/ui',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammerjs/hammer.min',
    'ojdnd': 'libs/oraclejet/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
    'ojs': 'libs/oraclejet/dist/js/libs/oj/min',
    'ojL10n': 'libs/oraclejet/dist/js/libs/oj/ojL10n',
    'ojtranslations': 'libs/oraclejet/dist/js/libs/oj/resources',
    'text': 'libs/text/text',
    'signals': 'libs/js-signals/dist/signals.min',
    'customElements': 'libs/webcomponents/CustomElements',
    'proj4': 'libs/proj4/dist/proj4-src',
    'css': 'libs/require-css/css',
  }
  //endinjector
  ,
  // Shim configurations for modules that do not expose AMD
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    }
  }
}
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'src/app/appController', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
  function (oj, ko, app) { // this callback gets executed when all required modules are loaded

oj.ModuleBinding.defaults.modelPath = 'src/app/';
oj.ModuleBinding.defaults.viewPath = 'text!src/app/';

    $(function() {

      function init() {
        oj.Router.sync().then(
          function () {
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(app, document.getElementById('globalBody'));
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);
