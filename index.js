var hyperquest = require('hyperquest');
var querystring = require('querystring');

var URL = 'http://strawpoll.me/ajax/new-poll';
var HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Requested-With': 'node-strawpoll'
};

module.exports = function(options) {
  var stream = hyperquest.post(URL, {headers: HEADERS});
  stream.end(querystring.stringify(options));
  return stream;
};