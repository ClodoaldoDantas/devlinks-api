import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      callback(null, fileName)
    },
  }),
}
