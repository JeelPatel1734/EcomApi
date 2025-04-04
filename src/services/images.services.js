const ImagesModel = require("../models/images.model");
const CategoryModel=require("../models/category.model");
const jwt = require("jsonwebtoken");

class ImagesServices{
    static async getDataByRuser(){
        const getRuse = await  CategoryModel.find({});
        return  getRuse;
}
    
    static async addimg(_imgController){
        try{
            console.log('_imgController', _imgController)
            const saveimg = new ImagesModel({_imgController});
                return await saveimg.save();
        }catch(err){
            console.log(err);
        }

    }
    
   
}

module.exports = ImagesServices;

