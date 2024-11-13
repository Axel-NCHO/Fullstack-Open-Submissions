/* eslint-disable no-console -- Needed */

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Log an info in the terminal
 * @param {...any} params info to log
 */
function info(...params) {
    console.log(...params);
}

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Log an error in the terminal
 * @param {...any} params error to log
 */
function error(...params) {
    console.error(...params);
}
/* eslint-enable no-console -- End of disable */

export default { info, error };
