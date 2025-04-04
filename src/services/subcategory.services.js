const SubcategoryModel = require("../models/subcategory.model");
const jwt = require("jsonwebtoken");

class SubcategoryServices{
  
    //add
    static async addsubcategory(title,_dropdownController,_textController,_imgController){
        try{
                console.log("-----title----_dropdownController-------_textController------_imgController",title,_dropdownController,_textController,_imgController);
                
                const AddProduct = new SubcategoryModel({title,_dropdownController,_textController,_imgController});
                return await AddProduct.save();
        }catch(err){
            throw err;
        }
    }
    static async getUserBysubcategory(title){
        try{
            return await SubcategoryModel.findOne({title});
        }catch(err){
            console.log(err);
        }
    }
    //getproduct
    static async getDataBysubcategory(){
        const getdat = await  SubcategoryModel.find({});
        return  getdat;
}

    //getproduct
    //getRuser
//     static async getDataByRuser(){
//         const getRuse = await  ProductModel.find({});
//         return  getRuse;
// }

    //getRuser

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

module.exports = SubcategoryServices;