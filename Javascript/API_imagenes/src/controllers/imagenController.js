const imagenModel = require("../models/imagenModel");
const handleHTTPError = require("sga-core/src/handleErrors");
const {}= require("sga-core")
const {findAllImages,findOneImage,insertImage,removeOneImage} = require("../services/imagenesService")
const PUBLIC_URL = process.env.PUBLIC_URL;


const getAllImages = async (req, res) => {
  try {
    const data = await findAllImages()
    res.send({ data: data });
  } catch (e) {
    handleHTTPError(res, `ERROR_LIST_IMAGES= ${e}`);
  }
};
const getOneImage = async (req, res) => {
  try {
    const { id } = req.params;//matchedData
    console.log(req.params);
    const data =await findOneImage(id)

    res.send({ data: data });
  } catch (error) {
    console.log(error);
    handleHTTPError(res, `ERROR_GET_IMAGEN = ${error}`);
  }
};
const createImage = async (req, res) => {
  try {
    const { body, file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await insertImage(fileData);
    res.send({ data: data });
  } catch (error) {
    handleHTTPError(res, `ERROR_CREATE_IMAGEN = ${error}`);
  }
};

const deleteOneImage =async (req, res) => {
    try {
      const {id,...body} =req.params
      data = removeOneImage(id)
      res.send({ data: data })
      
    } catch (error) {
      handleHTTPError(res,`ERROR_DELETE_IMAGEN = ${error}`)
    }
  };

module.exports = {getAllImages,getOneImage,createImage,deleteOneImage };