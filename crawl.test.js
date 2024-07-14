import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test("https url normalization 1", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path",
  );
});
