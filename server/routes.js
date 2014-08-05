/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {


  app.get('/mobile/:id', function(req, res) {
      res.render('mobile.jade', {id: req.params.id});
    });

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  var registerredUsers = {};
  var desktopSocket,
      mobileSocket;

  app.io.route('connection', function(socket) {

    socket.io.emit('connection-event', {this: 'is connection'});

    app.io.route('desktop-register', function(desktop) {
      registerredUsers[desktop.data.id] = desktopSocket = desktop;
      desktop.io.emit('desktop-registerred', {this: 'is desktop-register'});
    });

    app.io.route('mobile-register', function(mobile) {
      mobileSocket = mobile;
      mobileSocket.io.emit('mobile-registerred', {this: 'is mobile-register'});

      console.log(typeof(registerredUsers[mobile.data.id]));

      if(typeof(registerredUsers[mobile.data.id]) !== "undefined") {

          desktopSocket = registerredUsers[mobile.data.id];

          desktopSocket.io.emit('mobile-connected', {this: 'is mobile-connected'});
          mobileSocket.io.emit('start-experience', {this: 'is start-experience'});
      }
    });

    app.io.route('desktop-event', function(socket) {
      if(typeof(desktopSocket) !== 'undefined' && desktopSocket !== null) {
        desktopSocket.io.emit('desktop-event', {payload: socket.data});
      }
    });
    app.io.route('mobile-event', function(socket) {
      if(typeof(mobileSocket) !== 'undefined' && mobileSocket !== null) {
        mobileSocket.io.emit('mobile-event', {payload: socket.data});
      }
    });

  });

  app.io.route('ready', function(req) {
    req.io.emit('talk', {
      message: 'io event from an io route on the server'
    });
  });

};
