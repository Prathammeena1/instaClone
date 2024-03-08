const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

// Define destination directory and filename configuration
const uploadConfig = {
  destination: './public/images/uploads',
  allowedFileTypes: ['.jpg', '.jpeg', '.png'], // Example of allowed file types
  maxSize: 5 * 1024 * 1024 // Example of max file size (5 MB)
};

// Define file filter function to allow only specific file types
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (uploadConfig.allowedFileTypes.includes(extname)) {
    return cb(null, true);
  } else {
    const error = new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.');
    error.code = 'FILE_TYPE_NOT_ALLOWED';
    return cb(error, false);
  }
};

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadConfig.destination);
  },
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(16).toString('hex');
    const extname = path.extname(file.originalname);
    cb(null, randomName + extname);
  }
});

// Initialize multer upload with storage and file filtering
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: uploadConfig.maxSize }
});

module.exports = upload;
