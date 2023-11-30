const { exec } = require("child_process");

// Funkcja monitorująca zalogowanych użytkowników
function monitorLoggedUsers() {
  // Pobieranie bieżącej platformy (systemu operacyjnego)
  const platform = process.platform;
  let command;

  // Sprawdzenie, czy platforma to Windows
  if (platform === "win32") {
    // Polecenie do pobierania aktualnie zalogowanego użytkownika w systemie Windows

    command = "whoami";
  } else {
    console.error("Unsupported operating system");
    return;
  }

  // Wykonywanie polecenia i określanie kodowania jako UTF-8

  exec(command, { encoding: "utf-8" }, (err, username, stderr) => {
    if (err) {
      // Obsługa błędów podczas wykonywania polecenia
      console.error(`Error executing command: ${stderr}`);
      return;
    }

    console.log("Logged In User:", username);
  });
}

monitorLoggedUsers();
