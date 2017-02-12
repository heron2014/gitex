var Hapi = require('hapi');
var querystring = require('querystring');
var http = require('http');
var https = require('https');
require('env2')('config.env');

var server = new Hapi.Server();
server.connection({
  port: Number(process.env.PORT || 3000),
  routes: { cors: true }
});

var makeRequest = function(options, callback) {
  var request = https.request(options, function(response) {
    var body = '';
    if (response.statusCode !== 200) {
      // do something
    }
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      callback(null, body);
    });
  });

  request.on('error', function(error) {
    console.error('request failed');
    callback(error);
  });

  request.write(options.body);
  request.end();
}

server.route([{
    path: '/login',
    method: 'GET',
    handler: function(request, reply) {
      var params = {
        client_id : process.env.GITHUB_CLIENT_ID,
        redirect_uri : process.env.BASE_URL + '/authenticate'
      }
      reply.redirect(
        'https://github.com/login/oauth/authorize?'
          + querystring.stringify(params)
      );
    },
  }, {
  path:'/authenticate',
  method: 'GET',
  handler: function(request, reply) {
    console.log('code', request.url.query.code);
    var payload = querystring.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: request.query.code
    });
    makeRequest({
      hostname : 'github.com',
      path     : '/login/oauth/access_token',
      method   : 'POST',
      port     : '443',
      headers  : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/x-www-form-urlencoded',
        'Content-Length': payload.length
      },
      body: payload
    }, function(err, response) {
      if (err) {
        throw err;
      }
      console.log('response', response);
      reply(response);
    })
  }
}]);

server.start(function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('server listening on port ' + server.info.uri);
  }
});

module.exports = server;
