const os = require("os");

// Funkcja memoryAnalysis: Analizuje pamięć systemową i wirtualną oraz wyświetla wyniki.
function memoryAnalysis() {
  // Pobieranie informacji o pamięci systemowej
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  // Pobieranie informacji o pamięci wirtualnej
  const virtualMemory = os.totalmem() - os.freemem();
  const usedVirtualMemory = os.totalmem() - os.freemem() - os.freemem();

  console.log("Memory Analysis:");
  console.log(`Total Memory: ${formatBytes(totalMemory)}`);
  console.log(`Used Memory: ${formatBytes(usedMemory)}`);
  console.log(`Free Memory: ${formatBytes(freeMemory)}`);
  console.log("------------------------");
  console.log(`Virtual Memory: ${formatBytes(virtualMemory)}`);
  console.log(`Used Virtual Memory: ${formatBytes(usedVirtualMemory)}`);
}
// Funkcja formatBytes: Konwertuje ilość bajtów na odpowiednią jednostkę (KB, MB, GB).
function formatBytes(bytes) {
  const kibibytes = bytes / 1024;
  const mebibytes = kibibytes / 1024;
  const gibibytes = mebibytes / 1024;

  if (gibibytes >= 1) {
    return gibibytes.toFixed(2) + " GB";
  } else if (mebibytes >= 1) {
    return mebibytes.toFixed(2) + " MB";
  } else if (kibibytes >= 1) {
    return kibibytes.toFixed(2) + " KB";
  } else {
    return bytes.toFixed(2) + " Bytes";
  }
}

memoryAnalysis();
