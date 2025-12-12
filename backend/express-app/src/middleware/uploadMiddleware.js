const multer = require("multer");

// Use memory storage to temporarily store files in memory
const storage = multer.memoryStorage();

// Helper function to create multer instance
const createMulterUpload = (options) => {
  return multer({
    storage,
    limits: options.limits,
    fileFilter: (req, file, cb) => {
      if (options.allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(options.errorMessage));
      }
    },
  });
};

// Upload images (max 5MB)
const upload = createMulterUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  errorMessage: "Only image files are allowed",
});

// Upload PDFs (max 10MB)
const uploadPDF = createMulterUpload({
  limits: { fileSize: 10 * 1024 * 1024 },
  allowedMimeTypes: ["application/pdf"],
  errorMessage: "Only PDF files are allowed",
});

module.exports = {
  upload,
  uploadPDF,
};
