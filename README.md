# Pipe Callbacks

This little function will allow you to pipe callback functions. The function
takes as many callback functions as you want to pipe and then an error (reject)
function and a resolve function. If you don't at least pass three functions
it will error.

I like callbacks vs promises as many mess up promises anyways. This is a nice
function to avoid callback hell and make it easy to read. It also forces you to
handle the error and resolve correctly.

We read far more code then we write and this makes a bunch of callback functions
easy to read and reason about.

## Install

To install this function in your project run

```bash
npm install pipe-callback
```

## Usage

The callback functions you can pipe take a single value and then the callback,
the normal javascript style.

```javascript
function validCallbcakFunction(val, cb) {
  // ... Do work and then call cb
}
```

If the first callback in the list needs a value then you need to make it the
first thing you pass to the pipe-callbacks function.

```javascript
const pipeCallbacks = require('pipe-callbacks');

function getMoreData(val, cb) {
  cb(null, val + 'More');
}

pipeCallbacks(
  'StartData',
  getMoreData,
  getMoreData,
  getMoreData,
  console.error,
  console.log
);

// Logs: StartDataMoreMoreMore

```
You can also start with a callback that takes no value.

```javascript
const pipeCallbacks = require('pipe-callbacks');

function getData(cb) {
  cb(null, 'GetData');
}

function getMoreData(val, cb) {
  cb(null, val + 'More');
}

pipeCallbacks(
  getData,
  getMoreData,
  getMoreData,
  getMoreData,
  console.error,
  console.log
);

// Logs: GetDataMoreMoreMore

```

If any of your callbacks error the second to last function is called right away
with the error.

```javascript
const pipeCallbacks = require('pipe-callbacks');

function getData(cb) {
  cb(null, 'GetData');
}

function getMoreData(val, cb) {
  cb(null, val + 'More');
}

function getMoreDataError(val, cb) {
  cb('getMoreData error');
}

pipeCallbacks(
  getData,
  getMoreData,
  getMoreDataError,
  getMoreData,
  console.error,
  console.log
);

// Errors: getMoreData error

```

## Improvements

If you have any improvements please feel free to open an issue or pull request.

Enjoy!
