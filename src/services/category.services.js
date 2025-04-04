const CategoryModel = require("../models/category.model");
const jwt = require("jsonwebtoken");

class CategoryServices{
  
    //add
    static async addcategory(title,_textController,_imgController, _imgRef){
        try{
                console.log("-----title----_textController------_imgController",title,_textController,_imgController, _imgRef);
                
                const AddProduct = new CategoryModel({title,_textController,_imgController,_imgRef});
                return await AddProduct.save();
        }catch(err){
            throw err;
        }
    }
    static async addimg(_imgController){
        try{
            const saveimg = new UserModel({_imgController});
                return await saveimg.save();
        }catch(err){
            console.log(err);
        }

    }
    static async getUserBycategory(title){
        try{
            return await CategoryModel.findOne({title});
        }catch(err){
            console.log(err);
        }
    }
    //getproduct
    static async getDataBycategory(){
        const getcategorydat = await  CategoryModel.find({});
        return  getcategorydat;
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
           
module.exports = CategoryServices;



           

                                                       

