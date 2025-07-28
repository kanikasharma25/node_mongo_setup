
const multer = require("multer");
const path = require("path");
const response = require("../utils/response");
const { MESSAGES } = require("../constants/constants");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/profile");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);  
    cb(null, uniqueName );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" 
    // || file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    const err = new Error(MESSAGES.JPG_PNG_ALLOW_ONLY);
    err.code = "LIMIT_FILE_TYPE";
    cb(err, false); // Reject the file
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;
