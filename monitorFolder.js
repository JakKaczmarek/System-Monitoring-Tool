const fs = require("fs");

const directoryToWatch = "D:/Users/Kuba/system-monitoring-tool/";

fs.watch(directoryToWatch, (eventType, filename) => {
  if (eventType === "change") {
    console.log(`File ${filename} has been modified.`);
  } else if (eventType === "rename") {
    fs.exists(directoryToWatch + filename, (exists) => {
      if (exists) {
        console.log(`File ${filename} has been added.`);
      } else {
        console.log(`File ${filename} has been deleted.`);
      }
    });
  }
});

console.log(`I/O Monitor running for directory: ${directoryToWatch}`);
