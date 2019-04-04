function isBrowser() {
  try {
    return this === window;
  } catch (e) {
    return false;
  }
}

function isNode() {
  try {
    return this === global;
  } catch (e) {
    return false;
  }
}

export { isBrowser, isNode };
