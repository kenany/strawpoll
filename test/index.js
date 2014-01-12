var strawpoll = require('../');

var concat = require('concat-stream');
var isFunction = require('lodash.isfunction');
var nock = require('nock');
var test = require('tape');

test('exports', function(t) {
  t.plan(1);
  t.ok(isFunction(strawpoll));
});

test('works', function(t) {
  t.plan(1);

  var TEST_OPTIONS = {
    title: 'Test poll',
    options: [
      'wow',
      'awesome',
      'amazing',
      'nice'
    ],
    multi: false,
    permissive: true
  };

  var server = nock('http://strawpoll.me')
    .post('/ajax/new-poll')
    .reply(200, '{"id": 12345}');

  var stream = strawpoll(TEST_OPTIONS);

  stream.pipe(concat(function(poll) {
    poll = JSON.parse(poll);
    t.deepEqual(poll, {id: 12345});
  }));
});