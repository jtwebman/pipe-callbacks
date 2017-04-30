'use strict';

function handleError(rest, reject, resolve) {
  return (err, newVal) => {
    if (err) {
      reject(err);
    } else {
      if (rest.length === 0) {
        resolve(newVal);
      } else {
        pipeCallbacks(newVal, ...rest, reject, resolve);
      }
    }
  };
}

/**
 * Pipes callback functions handling errors correctly
 * @param  {...Function} args    The callback functions to call in order. The
 *                               first does not need to take a value. The last
 *                               two are reject and resolve.
 * @return {undefined}
 */
function pipeCallbacks(...args) {
  if (args.length < 3) {
    throw Error('Compose callback needs three functions at least');
  }

  const resolve = args.pop();
  const reject = args.pop();

  if (typeof args[0] === 'function') {
    const [fn, ...rest] = args;
    fn(handleError(rest, reject, resolve));
  } else {
    const [lastVal, fn, ...rest] = args;
    fn(lastVal, handleError(rest, reject, resolve));
  }
}

module.exports = pipeCallbacks;
