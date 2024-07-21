function printReport(urls) {
  let sortedURLs = Object.entries(urls).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < sortedURLs.length; i++) {
    console.log(
      `Found ${sortedURLs[i][1]} internal links to ${sortedURLs[i][0]}`,
    );
  }
}

export { printReport };
