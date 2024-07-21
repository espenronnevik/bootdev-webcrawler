import { argv } from "node:process";
import { crawlPage } from "./crawl.js";

async function main(baseURL) {
  await crawlPage(baseURL);
}

if (!argv.length === 2) {
  console.log("Required argument is URL to webside being crawled");
  process.exitCode = 1;
} else {
  main(argv[2]);
}
