const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
const BookingModel=require("../models/booking.model");
const jwt = require("jsonwebtoken");

class UserServices{
    //
    static async changestatus(email,status,first,_id){
        try{
            const filter={email:email,first:first,_id:_id};
            const update={ $set: { status: status } };
            const result = await BookingModel.findOneAndUpdate(filter, update,{new:true});
            console.log(result);
            return result;
            
            

        }
        catch (error) {
            console.error("error updating user status:",error);
        }
    }
                          
    //
 
    static async registerUser(first_name,last_name,email,username,password){
        try{
                console.log("--------response---------------",first_name,last_name,email,username,password);
                
                const createUser = new UserModel({first_name,last_name,email,username,password});
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }
    //add
    static async addproduct(product_name, product_price){
        try{
                console.log("-----product_name --- product_price-----",product_name, product_price);
                
                const AddProduct = new ProductModel({product_name, product_price});
                return await AddProduct.save();
        }catch(err){
            throw err;
        }
    }
    static async getUserByEmail(email){
    try {    
    const user= await UserModel.find({email});
    return user;
    } catch (err) {
        throw new Error('Failed to get user by email');
    }
}


       static async getDataByboo(username)
       {
        const getpcategory = await  UserModel.find({username});
        return  getpcategory;
        
}
static async getDataallbooking()
{
    const getalldat= await BookingModel.find({});
    return getalldat;
}
    //add

    // static async getUserByEmail(email){
    //     try{
    //         return await UserModel.findOne({email});
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    //getuserbyproduct
    static async getUserByProduct(product_name){
        try{
            return await ProductModel.findOne({product_name});
        }catch(err){
            console.log(err);
        }
    }
    //
    static async getDataByeditprofile(email){
     
        const getpcategory = await  BookingModel.find({email});
        return  getpcategory;
        
}
    //getuserbyproduct

    static async checkUser(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
        //getRuser
        static async getDataByRuser(){
            const getRuse = await  UserModel.find({});
            return  getRuse;
    }
    
        //getRuser
        //delete Ruser
        static async deleteruser(email){
            const deleter=await UserModel.deleteMany({email:email})
            console.log("${deleter.deletedCont} deleted for emila :${email}");
            return deleter
        }
//delete Ruser
    
}


module.exports = UserServices;