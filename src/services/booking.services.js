const BookingModel = require("../models/booking.model");
const jwt = require("jsonwebtoken");

class BookingServices{
    static async addbooking(email,first,last,pin,mobile,add1,add2,_imgController,title,current,status){
        try{
                console.log("--------response---------------",email,first,last,pin,mobile,add1,add2,_imgController,title,current,status);
                
                const createUser = new BookingModel({email,first,last,pin,mobile,add1,add2,_imgController,title,current,status});
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }
    

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

module.exports = BookingServices;
