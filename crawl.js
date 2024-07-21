import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const normURL = new URL(url);
  let newURL = `${normURL.host}${normURL.pathname}`;
  if (newURL.endsWith("/")) {
    newURL = newURL.slice(0, -1);
  }
  return newURL;
}

function isAbsoluteURL(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function isRelativeURL(url) {
  return !isAbsoluteURL(url);
}

function toAbsoluteURL(url, baseURL) {
  return baseURL + url;
}

function isSameDomain(url, domain) {
  return isRelativeURL(url) || url.startsWith(domain);
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  let anchors = dom.window.document.querySelectorAll("a");
  let urls = [];
  for (let i = 0; i < anchors.length; i++) {
    let url = anchors[i].getAttribute("href");
    if (isRelativeURL(url)) {
      url = toAbsoluteURL(url, baseURL);
    }
    urls.push(url);
  }
  return urls;
}

async function fetchURLs(url) {
  let resp = null;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return [];
  }

  if (resp.status >= 400) {
    console.error(`HTTP error on URL ${url}`);
    return [];
  }

  if (resp.headers.get("content-type") != "text/html") {
    console.error(`Content type is not text / html for URL ${url}`);
    return [];
  }

  let htmlBody = await resp.text();
  return getURLsFromHTML(htmlBody);
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  if (!isSameDomain(currentURL, baseURL)) {
    return pages;
  }

  let nCurrentURL = normalizeURL(currentURL);
  if (nCurrentURL in pages) {
    pages[nCurrentURL] += 1;
    return pages;
  } else {
    pages[nCurrentURL] = 1;
  }

  let urls = await fetchURLs(currentURL);
  for (let i = 0; i < urls.length; i++) {
    crawlPage(baseURL, urls[i], pages);
  }

  return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
