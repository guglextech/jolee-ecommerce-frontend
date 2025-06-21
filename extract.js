const fs = require("fs");
const unzipper = require("unzipper");

fs.createReadStream("select.zip")
  .pipe(unzipper.Extract({ path: "./node_modules/" }))
  .on("close", () => {
    console.log("Extraction complete");
    process.exit(0);
  })
  .on("error", (err) => {
    console.error("Extraction failed:", err);
    process.exit(1);
  });
