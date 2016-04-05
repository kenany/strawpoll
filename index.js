var hyperquest = require('hyperquest');

var URL = 'http://strawpoll.me/api/v2/polls';
var HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  'X-Requested-With': 'node-strawpoll'
};

function create(options) {
  var stream = hyperquest.post(URL, {headers: HEADERS});
  stream.end(JSON.stringify(options));
  return stream;
}

function get(id) {
  var stream = hyperquest.get(URL + '/' + id);
  return stream;
}

create.create = create;
create.get = get;

module.exports = create;
