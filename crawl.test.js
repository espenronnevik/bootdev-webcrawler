import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("https url normalization 1", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path",
  );
});

test("https url normalization 2", () => {
  expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("https url normalization 3", () => {
  expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test("https url normalization 4", () => {
  expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("https get url from html 1", () => {
  let html =
    '<html><body><a href="https://boot.dev">Learn Backend Development</a><a href="/leaderboard">rellink to leaderboard\
      </a><a href="https://boot.dev/lore">Check out the lore</a>https</body></html>';
  expect(getURLsFromHTML(html, "https://boot.dev")).toContain(
    "https://boot.dev",
  );
});

test("https get url from html 2", () => {
  let html =
    '<html><body><a href="https://boot.dev">Learn Backend Development</a><a href="/leaderboard">rellink to leaderboard\
      </a><a href="https://boot.dev/lore">Check out the lore</a>https</body></html>';
  expect(getURLsFromHTML(html, "https://boot.dev")).toContain(
    "https://boot.dev/leaderboard",
  );
});

test("https get url from html 3", () => {
  let html =
    '<html><body><a href="https://boot.dev">Learn Backend Development</a><a href="/leaderboard">rellink to leaderboard\
      </a><a href="https://boot.dev/lore">Check out the lore</a>https</body></html>';
  expect(getURLsFromHTML(html, "https://boot.dev")).toContain(
    "https://boot.dev/lore",
  );
});
