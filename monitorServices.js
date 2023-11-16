const { exec } = require("child_process");
const iconv = require("iconv-lite");

// Funkcja monitorServices: Monitoruje usługi systemowe i wyświetla ich status.
function monitorServices() {
  // Sprawdzanie platformy systemowej
  const platform = process.platform;
  let command;

  if (platform === "win32") {
    command = "sc query";
  } else {
    console.error("Unsupported operating system");
    return;
  }
  // Wywołanie polecenia systemowego
  exec(command, { encoding: "buffer" }, (err, servicesOutput, stderr) => {
    if (err) {
      console.error(`Error executing command: ${stderr}`);
      return;
    }
    // Dekodowanie wyników polecenia z kodowania cp1250
    const decodedOutput = iconv.decode(servicesOutput, "cp1250");
    console.log(decodedOutput);
  });
}

monitorServices();
