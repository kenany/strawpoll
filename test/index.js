var strawpoll = require('../');

var concat = require('concat-stream');
var isFunction = require('lodash.isfunction');
var nock = require('nock');
var test = require('tape');

test('exports', function(t) {
  t.plan(3);
  t.ok(isFunction(strawpoll),"strawpoll is a function");
  t.ok(isFunction(strawpoll.get),"strawpoll.get is a function");
  t.ok(isFunction(strawpoll.create),"strawpoll.create is a function");
});

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


test('works', function(t) {
  t.plan(1);

  var stream = strawpoll(TEST_OPTIONS);

  var server = nock('http://strawpoll.me')
    .post('/api/v2/polls')
    .reply(200, '{"id": 12345}');

  stream.pipe(concat(function(poll) {
    poll = JSON.parse(poll);
    t.deepEqual(poll, {id: 12345},"responses match");
  }));
});

test('create', function(t) {
  t.plan(1);

  var stream = strawpoll.create(TEST_OPTIONS);

  var server = nock('http://strawpoll.me')
    .post('/api/v2/polls')
    .reply(200, '{"id": 12345}');

  stream.pipe(concat(function(poll) {
    poll = JSON.parse(poll);
    t.deepEqual(poll, {id: 12345},"responses match");
  }));
});

test('get', function(t) {
  t.plan(1);

  var TEST_ID = 1;

  var TEST_RESPONSE = '{"id": '+TEST_ID+',"title": "Test Poll","multi": false,"options": ["A","B","C","D"],"votes": [13072,26807,4868,6425]}';

  var server = nock('http://strawpoll.me')
    .get('/api/v2/polls/'+TEST_ID)
    .reply(200, TEST_RESPONSE);

  var stream = strawpoll.get(TEST_ID);
  stream.pipe(concat(function(poll) {
    poll = JSON.parse(poll);
    t.deepEqual(poll,JSON.parse(TEST_RESPONSE),"responses match");
  }));
});
