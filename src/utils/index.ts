import fs from 'fs'
import path from 'path'
interface FileInfo {
  name: string
  path: string
}

export function getAllFiles(dirPath: string, arrayOfFiles: FileInfo []): FileInfo[] {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push({ path: path.join(dirPath, "/", file), name: file.replace('.ts', '').replace('.js', '').replace('.tsx', '')})
    }
  })

  return arrayOfFiles
}