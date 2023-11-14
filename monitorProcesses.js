const { exec } = require("child_process");
const iconv = require("iconv-lite");

function getProcessesAndMemoryUsage() {
  const tasklistCommand = "tasklist /fo csv";

  exec(
    tasklistCommand,
    { encoding: "buffer" },
    (err, tasklistOutput, stderr) => {
      if (err) {
        console.error(`Error in tasklist command: ${stderr}`);
        return;
      }

      const decodedTasklistOutput = iconv.decode(tasklistOutput, "cp1250");

      const tasklistLines = decodedTasklistOutput
        .split("\r\n")
        .map((line) => line.split('","'));

      for (
        let index = 1;
        index < tasklistLines.length && index <= 15;
        index++
      ) {
        const process = tasklistLines[index];
        const processName = process[0].replace('"', "");
        const processId = process[1].replace('"', "");
        const cpuTime = process[4].replace('"', "");
        console.log(
          `Process Name: ${processName}, Process ID: ${processId}, CPU Time: ${cpuTime}`
        );
      }

      console.log("Memory Usage:", process.memoryUsage());

      setTimeout(() => {}, 5000); 
    }
  );
}

getProcessesAndMemoryUsage();
