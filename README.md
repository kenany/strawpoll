# strawpoll

[![Build Status](https://travis-ci.org/KenanY/strawpoll.svg?branch=master)](https://travis-ci.org/KenanY/strawpoll)
[![Dependency Status](https://gemnasium.com/KenanY/strawpoll.svg)](https://gemnasium.com/KenanY/strawpoll)

Create and get polls on [Straw Poll](http://strawpoll.me/).

## Example

Here's an example using concat-stream:

``` javascript
var concat = require('concat-stream');
var strawpoll = require('strawpoll');

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
```

Add JSONStream and you don't even have to use `JSON.parse` yourself!

``` javascript
var concat = require('concat-stream');
var JSONStream = require('JSONStream');
var strawpoll = require('strawpoll');

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
```

An example of getting a poll with concat-stream:

``` javascript
var concat = require('concat-stream');
var strawpoll = require('strawpoll');

var stream = strawpoll.get(1)
  .pipe(concat(function(poll) {
    poll = JSON.parse(poll);
    // poll.id is the id you requested
    // poll.title is the title of the poll
  }));
```

The JSON parsed response will match examples from the
[Straw Poll API](https://github.com/strawpoll/strawpoll/wiki/API).

## Installation

``` bash
$ npm install strawpoll
```

## API

``` javascript
var strawpoll = require('strawpoll');
```

### strawpoll(options)

Returns a [hyperquest](https://github.com/substack/hyperquest) stream which is
`POST`ing to Straw Poll in order to create your poll.

`options`:

  - `title` (_String_)
  - `options` (_Array_)
  - `multi` (_Boolean_)
  - `permissive` (_Boolean_)

### strawpoll.create(options)

Alias of just `strawpoll(options)`.

### strawpoll.get(id)

Returns a hyperquest stream which is `GET`ing poll information from Straw Poll
based on _Number_ `id`.
