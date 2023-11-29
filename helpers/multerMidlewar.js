const multer = require('multer')
const path = require('path')



const uploads = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
}).single('image')

module.exports = {
    uploads
}