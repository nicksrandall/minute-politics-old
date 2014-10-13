/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var SNSClient = require('aws-snsclient');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/posts', require('./api/post'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  var auth = {
      region: 'us-west-2',
      account: '484021737921',
      topic: 'stump-transcode-done'
  };

  var snsClient = new SNSClient(auth, function(err, message) {
      console.log(message);
  });

  app.post('/sns', snsClient);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
