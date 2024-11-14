/* eslint-disable no-console -- Needed */

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Log an info in the terminal
 * @param {...any} params info to log
 */
function info(...params) {
    if (process.env.NODE_ENV !== "test") {
        console.log(...params);
    }
}

// eslint-disable-next-line jsdoc/require-returns -- Nothing to return
/**
 * Log an error in the terminal
 * @param {...any} params error to log
 */
function error(...params) {
    if (process.env.NODE_ENV !== "test") {
        console.error(...params);
    }
}
/* eslint-enable no-console -- End of disable */

export default { info, error };
