/**
 * Reverse a string
 * @param {string} string a string
 * @returns {string} reversed string
 */
export function reverse(string) {
    return string
        .split("")
        .reverse()
        .join("");
}

/**
 * Get average of numbers in an array
 * @param {Array} array array
 * @returns {number} average of numbers in the array
 */
function average(array) {
    return array.reduce((sum, item) => sum + item, 0) / array.length;
}

export default {
    reverse,
    average
};
