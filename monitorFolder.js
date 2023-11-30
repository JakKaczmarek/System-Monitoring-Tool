const fs = require("fs");

// Ścieżka do monitorowania zmian w katalogu
const directoryToWatch = "D:/Users/Kuba/system-monitoring-tool/";

// Uruchamianie monitora zmian w katalogu
fs.watch(directoryToWatch, (eventType, filename) => {
  // Sprawdzanie typu zdarzenia (zmiana, przeniesienie, usunięcie)
  if (eventType === "change") {
    console.log(`File ${filename} has been modified.`);
  } else if (eventType === "rename") {
    // Sprawdzanie, czy plik istnieje po zdarzeniu "rename"
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
