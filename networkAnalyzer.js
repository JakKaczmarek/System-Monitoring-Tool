const { exec } = require("child_process");
const iconv = require("iconv-lite");

// Funkcja analyzeNetworkActivity: Analizuje aktywność sieciową, wyświetlając otwarte porty i aktywne połączenia.
function analyzeNetworkActivity() {
  const netstatCommand = "netstat -ano";

  exec(netstatCommand, { encoding: "buffer" }, (err, netstatOutput, stderr) => {
    if (err) {
      console.error(`Error in netstat command: ${stderr}`);
      return;
    }
    // Konwertuje dane wejściowe z kodowania cp1250 na standardowy tekst.
    const decodedNetstatOutput = iconv.decode(netstatOutput, "cp1250");

    // Podział wyników netstat na linie i usunięcie zbędnych białych znaków
    const netstatLines = decodedNetstatOutput
      .split("\r\n")
      .map((line) => line.trim());

    // Wyświetlanie otwartych portów
    console.log("Open Ports:");
    netstatLines.forEach((line) => {
      if (line.startsWith("TCP") && line.includes("LISTEN")) {
        const parts = line.split(/\s+/);
        console.log(`  Port: ${parts[1]}, PID: ${parts[4]}`);
      }
    });
    
    // Wyświetlanie aktywnych połączeń
    console.log("\nActive Connections:");
    netstatLines.forEach((line) => {
      if (line.startsWith("TCP") && !line.includes("LISTEN")) {
        const parts = line.split(/\s+/);
        console.log(
          `  Local Address: ${parts[1]}, Foreign Address: ${parts[2]}, PID: ${parts[4]}`
        );
      }
    });
  });
}

analyzeNetworkActivity();
