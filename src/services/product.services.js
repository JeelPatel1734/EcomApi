











const UserModel = require("../models/product.model");
const jwt = require("jsonwebtoken");

class ProductServices{
  
    //add
    static async addproduct(_activeController, _imgController, _imgRef,title,purchase,previous,current,_dropdownController,_trueController,desc,tags,_multiimgController,_multiimgRef,inventory){
        try{
                console.log("-----title----_textController------_imgController",_activeController, _imgController,title,purchase,previous,current,_dropdownController,_trueController,desc,tags,_multiimgController,inventory);
                
                const AddProduct = new UserModel({_activeController, _imgController, _imgRef,title,purchase,previous,current,_dropdownController,_trueController,desc,tags,_multiimgController,_multiimgRef,inventory});
                return await AddProduct.save();
        }catch(err){
            throw err;
        }
    }
    static async getDataByProduct(){
        const getpdat = await  UserModel.find({});
        return  getpdat;
}
    //getproduct
    static async getDataByProductCateg(_dropdownController){
        if(_dropdownController=="All")
        {
            const getpcategory = await  UserModel.find({});
            return  getpcategory;
        }
        else{
        const getpcategory = await  UserModel.find({_dropdownController});
        return  getpcategory;
        }
}

    //getproduct
    //getRuser
//     static async getDataByRuser(){
//         const getRuse = await  ProductModel.find({});
//         return  getRuse;
// }

    //getRuser

    // static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
    //     return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    // }
}

module.exports = ProductServices;







































