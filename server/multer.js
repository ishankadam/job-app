const multer = require("multer");
//configure how the files are stored
const leaveStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    //where to store the file
    cb(null, "uploads/leaves/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const announcemnetStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    //where to store the file
    cb(null, "uploads/announcements/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file if it's not a jpg or png
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const leaveUpload = multer({
  storage: leaveStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const announcementUpload = multer({
  storage: announcemnetStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = { leaveUpload, announcementUpload };