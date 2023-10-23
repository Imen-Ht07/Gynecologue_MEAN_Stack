const multer = require('multer');
const path = require('path');
//image upload
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
         cb(null, path.join("./uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
// checking file type
const fileFilter = (req, file, cb) => {
    if (!file) {
        cb(new Error('No file uploaded.', 400), false);
    }
    else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.', 400), false);
    }
};
exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});