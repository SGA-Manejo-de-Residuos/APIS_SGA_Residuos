const imageModel = require("../models/imagenModel")
const MEDIA_PATH = `${__dirname}/../public`;
const fs = require("fs").promises;
const insertImage = async (fileData) => {
  const response = await imageModel.create(fileData);
  return response;
};
const findAllImages = async ()=>{
    const response = await imageModel.find({});
    return response;

}
const findOneImage = async (id)=>{
    const response = await imageModel.findOne({_id:id});
    return response;

}
const removeOneImage = async (id)=>{
    const dataFile = await imageModel.findById({_id:id})
    const {filename} = dataFile
    const filePath = `${MEDIA_PATH}/${filename}`
    await fs.unlink(filePath)
    const response = {filePath,deleted:1}
    await imageModel.deleteOne({_id:id});
    console.log('Imagen eliminada')
    return response;

}

module.exports={ findAllImages,findOneImage,insertImage,removeOneImage};