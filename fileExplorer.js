const fs = require("fs/promises");
const path = require("path");

// Funkcja do eksploracji systemu plików
async function exploreFileSystem(directoryPath) {
  try {
    // Funkcja rekurencyjna do eksploracji katalogu
    async function exploreDirectory(currentPath) {
      // Pobieranie listy plików w bieżącym katalogu
      const files = await fs.readdir(currentPath);

      for (const file of files) {
        const filePath = path.join(currentPath, file);
        // Pobieranie informacji o pliku
        const stats = await fs.stat(filePath);

        // Sprawdzanie, czy to katalog czy plik
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
// Wywołanie funkcji eksplorującej system plików z bieżącego katalogu
exploreFileSystem(__dirname);
