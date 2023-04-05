// Require modules
const path = require('path')
const multer = require('multer');

// Create express app
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, './public/images')
     },
     filename: (req, file, cb) => {
          const nameFile = Date.now() + path.extname(file.originalname)
          cb(null, nameFile)
     }
})
const upload = multer({ storage: storage })

module.exports = upload
