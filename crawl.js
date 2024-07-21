function normalizeURL(url) {
  const normURL = new URL(url);
  let newURL = `${normURL.host}${normURL.pathname}`;
  if (newURL.endsWith("/")) {
    newURL = newURL.slice(0, -1);
  }
  return newURL;
}

export { normalizeURL };
