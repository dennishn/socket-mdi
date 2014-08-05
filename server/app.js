/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = require('express.io')();
var config = require('./config/environment');

app.http().io();

require('./config/express')(app);
require('./routes')(app);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
