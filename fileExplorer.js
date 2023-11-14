const fs = require("fs/promises");
const path = require("path");

async function exploreFileSystem(directoryPath) {
  try {
    async function exploreDirectory(currentPath) {
      const files = await fs.readdir(currentPath);

      for (const file of files) {
        const filePath = path.join(currentPath, file);
        const stats = await fs.stat(filePath);

        if (stats.isDirectory()) {
          console.log(`[Folder] ${filePath}`);
          await exploreDirectory(filePath);
        } else {
          console.log(`[File] ${filePath}`);
          console.log(`  Size: ${stats.size} bytes`);
          console.log(`  Created: ${stats.birthtime}`);
          console.log(`  Modified: ${stats.mtime}`);
        }
      }
    }

    console.log(`Contents of ${directoryPath}:`);
    await exploreDirectory(directoryPath);
  } catch (error) {
    console.error(`Error exploring the file system: ${error.message}`);
  }
}

exploreFileSystem(__dirname);
