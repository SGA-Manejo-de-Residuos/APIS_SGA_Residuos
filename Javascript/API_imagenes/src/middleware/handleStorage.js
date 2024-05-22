const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathStorage = `${__dirname}/../public`;
    cb(null, pathStorage);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const fileName = `file_${Date.now()}.${ext}`;
    cb(null, fileName);
  }
});

const uploadMiddleware = multer({ storage,limits:{fileSize:10000000},
//   fileFilter:function(req,file,cb) {
//   let type = file.mimetype.startsWith("image/")
//   type?cb(null,true):cb(new Error("no es un archivo de tipo imagen"))
// } 
});

module.exports = uploadMiddleware;
