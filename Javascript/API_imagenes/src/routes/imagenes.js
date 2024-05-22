const express = require('express');
const router = express.Router();
const uploadMiddleware = require("../middleware/handleStorage")
const {validatorGetItem }= require("../middleware/imageValidator")

const {getAllImages,getOneImage,createImage,deleteOneImage}= require("../controllers/imagenController")


router.get("/imagenes",getAllImages)
router.get("/imagenes/:id",validatorGetItem,getOneImage)
router.post("/imagenes/",uploadMiddleware.single("imagenFile"),createImage)
router.delete("/imagenes/:id",validatorGetItem,deleteOneImage)

module.exports = router