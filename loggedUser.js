const { exec } = require("child_process");

function monitorLoggedUsers() {
  const platform = process.platform;
  let command;

  if (platform === "win32") {
    command = "whoami";
  } else {
    console.error("Unsupported operating system");
    return;
  }

  exec(command, { encoding: "utf-8" }, (err, username, stderr) => {
    if (err) {
      console.error(`Error executing command: ${stderr}`);
      return;
    }

    console.log("Logged In User:", username);
  });
}

monitorLoggedUsers();
