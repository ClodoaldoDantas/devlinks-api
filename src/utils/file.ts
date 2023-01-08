import fs from 'fs'

export function deleteFile(filename: string) {
  try {
    fs.unlinkSync(`./uploads/${filename}`)
  } catch (err) {
    console.log('File is not deleted', err)
  }
}

export function getAvatarURL(filename: string | null) {
  if (!filename) return null

  return `http://localhost:3333/uploads/${filename}`
}
