'use strict';
const assert = require('chai').assert;
const pipeCallbacks = require('../src/pipe-callbacks');

function getData(cb) {
  setTimeout(() => cb(null, 'GetData'), 5);
}

function getMoreData(val, cb) {
  setTimeout(() => cb(null, val + 'More'), 5);
}

function getMoreDataError(val, cb) {
  setTimeout(() => cb('getMoreData error'), 5);
}

describe('Pipe callbacks', () => {
  it('can pipe mutiple callbacks starting with a value', (done) => {
    pipeCallbacks(
      'StartData',
      getMoreData,
      getMoreData,
      getMoreData,
      getMoreData,
      (err) => assert.isNull(err, 'should never error'),
      (val) => {
        assert.equal('StartDataMoreMoreMoreMore', val);
        done();
      }
    );
  });

  it('can pipe mutiple callbacks with the first taking no values',
  (done) => {
    pipeCallbacks(
      getData,
      getMoreData,
      getMoreData,
      getMoreData,
      getMoreData,
      (err) => assert.isNull(err, 'should never error'),
      (val) => {
        assert.equal('GetDataMoreMoreMoreMore', val);
        done();
      }
    );
  });

  it('calls reject if any callback errors', (done) => {
    pipeCallbacks(
      getData,
      getMoreData,
      getMoreDataError,
      getMoreData,
      getMoreData,
      (err) => {
        assert.equal('getMoreData error', err);
        done();
      },
      (val) => assert.isNull(val, 'should never return value')
    );
  });
});
