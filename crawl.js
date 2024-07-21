import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const normURL = new URL(url);
  let newURL = `${normURL.host}${normURL.pathname}`;
  if (newURL.endsWith("/")) {
    newURL = newURL.slice(0, -1);
  }
  return newURL;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  let anchors = dom.window.document.querySelectorAll("a");
  let urls = [];
  for (let i = 0; i < anchors.length; i++) {
    let url = anchors[i].getAttribute("href");
    if (!(url.startsWith("http://") || url.startsWith("https://"))) {
      url = baseURL + url;
    }
    urls.push(url);
  }
  return urls;
}

async function crawlPage(url) {
  let resp = null;

  try {
    resp = await fetch(url);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return;
  }

  if (resp.status >= 400) {
    console.log(`HTTP error on URL ${url}`);
    return;
  }

  if (resp.headers.get("content-type") != "text/html") {
    console.log(`Content type is not text / html for URL ${url}`);
    return;
  }

  console.log(await resp.text());
}

export { normalizeURL, getURLsFromHTML, crawlPage };
