var concat = require('concat-stream');
var strawpoll = require('../');

var stream = strawpoll({
  title: 'My first poll',
  options: [
    'wow',
    'awesome',
    'amazing',
    'nice'
  ],
  multi: false,
  permissive: true
});

stream.pipe(concat(function(poll) {
  poll = JSON.parse(poll);
  // poll.id is your poll's id
  // check out your poll at strawpoll.me/id
}));