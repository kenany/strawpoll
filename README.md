# strawpoll

Create polls on [Straw Poll](http://strawpoll.me/).

## Example

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
})

stream.pipe(concat(function(poll) {
  poll = JSON.parse(poll);
  // poll.id is your poll's id
  // check out your poll at strawpoll.me/id
}));
```

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