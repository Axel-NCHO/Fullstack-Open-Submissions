const percentEncoding = {
    ":": "%3A",
    "/": "%2F",
    "?": "%3F",
    "#": "%23",
    "[": "%5B",
    "]": "%5D",
    "@": "%40",
    "!": "%21",
    $: "%24",
    "&": "%26",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "*": "%2A",
    "+": "%2B",
    ",": "%2C",
    ";": "%3B",
    "=": "%3D",
    "%": "%25",
    " ": "%20"
};

/**
 * Generate random int between 5 and 10000
 * @returns {number} random int between 5 and 10000
 */
function generateId() {
    const minCeiled = Math.ceil(5);
    const maxFloored = Math.floor(10_000);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default { percentEncoding, generateId };
