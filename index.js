var hyperquest = require('hyperquest');
var querystring = require('querystring');

var URL = 'http://strawpoll.me/api/v2/polls';
var HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Requested-With': 'node-strawpoll'
};

module.exports = strawpoll;

function strawpoll(options) {
  if(options) {
    return strawpoll.create(options);
  }
}

strawpoll.get= function(id) {
  var stream = hyperquest.get(URL + '/' + id);
  return stream;
};

strawpoll.create = function(options) {
  var stream = hyperquest.post(URL, {headers: HEADERS});
  stream.end(querystring.stringify(options));
  return stream;
};
