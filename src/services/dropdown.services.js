const DropdownModel = require("../models/dropdown.model");
const jwt = require("jsonwebtoken");

class DropdownServices{
    static async alldropdown(dropdownname){
        try{
                console.log("--------dropdownname---------------",dropdownname);
                const savedropdown=new DropdownModel({dropdownname});
                return await savedropdown.save();
        }catch(err){
            console.log(err);
        }
    }
    static async getdropdowndataservices(){
        const getdropdata= await DropdownModel.find();
        return getdropdata;
    }
    

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

module.exports = DropdownServices;
