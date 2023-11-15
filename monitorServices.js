const { exec } = require("child_process");
const iconv = require("iconv-lite");

function monitorServices() {
  const platform = process.platform;
  let command;

  if (platform === "win32") {
    command = "sc query";
  } else {
    console.error("Unsupported operating system");
    return;
  }

  exec(command, { encoding: "buffer" }, (err, servicesOutput, stderr) => {
    if (err) {
      console.error(`Error executing command: ${stderr}`);
      return;
    }

    const decodedOutput = iconv.decode(servicesOutput, "cp1250");
    console.log(decodedOutput);
  });
}

monitorServices();
