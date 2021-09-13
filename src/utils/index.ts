import * as fs from 'fs'
import * as path from 'path'

export function getAllFiles(dirPath: string, arrayOfFiles: string []): string[] {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

export const appDirectory = fs.realpathSync(process.cwd())

export function resolveApp (relativePath: string) {
  return path.join(__dirname, relativePath)
}