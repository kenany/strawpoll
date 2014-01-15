var concat = require('concat-stream');
var JSONStream = require('JSONStream');
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
})
  .pipe(JSONStream.parse('id'))
  .pipe(concat(function(id) {
    // `id` is a Buffer here
    // `id.toString()` is your poll's id
  }));