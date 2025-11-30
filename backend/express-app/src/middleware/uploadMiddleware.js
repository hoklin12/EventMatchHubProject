const multer = require("multer");

const storage = multer.memoryStorage(); // store files in memory

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

module.exports = upload;
