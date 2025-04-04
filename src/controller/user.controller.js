const UserServices = require('../services/user.service');
const ProductServices = require('../services/product.services');
const SubcategoryServices = require('../services/subcategory.services');
const CategoryServices = require('../services/category.services');
const BookingServices = require('../services/booking.services');
const ImagesServices = require('../services/images.services');
const DropdownServices= require('../services/dropdown.services');
const {GridFsStorage} = require('multer-gridfs-storage');
//
exports.img =  async (req,res,next)=>{
    try {
        // const { userId } = req.body;
        let getRuser = await ImagesServices.getDataByRuser();
        // res.json({status: true,success:getdata});
        res.json(getRuser); //getRuser
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
//

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const {first_name,last_name,email,username,password } = req.body;
      
        const response = await UserServices.registerUser(first_name,last_name,email,username,password);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}
//bookingdetails
exports.addbookingdetails= async (req, res, next)=>{
    try {
        console.log("---req body---", req.body);
        const {email,first,last,pin,mobile,add1,add2,_imgController,title,current,status} = req.body;
        
        const response = await BookingServices.addbooking(email,first,last,pin,mobile,add1,add2,_imgController,title,current,status);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}
//bookingdetails
//add product
exports.AddProduct = async (req, res, next) => {
    console.log(req.body)

    try {
        console.log("---req body---", req.body);
        console.log("---req file---", req.files['_imgController'][0].id);
        console.log("---req file---", req.files['_multiimgController'][0].id);
        const { _activeController, _imgController,title,purchase,previous,current,_dropdownController,_trueController,desc,tags,_multiimgController,inventory} = req.body;
        // const duplicate = await ProductServices.getUserByProduct();
        // if (duplicate) {
        //     throw new Error(`Title ${title}, Already added`)
        // }
        const response = await ProductServices.addproduct(_activeController, `${req.files['_imgController'][0].originalname}`, req.files['_imgController'][0].id,title,purchase,previous,current,_dropdownController,_trueController,desc,tags,`${req.files['_multiimgController'][0].originalname}`, req.files['_multiimgController'][0].id,inventory);

        res.json({ status: true, success: 'Product added successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

//add product
//add subcategory
exports.subcategory = async (req, res, next) => {
    console.log(req.body)

    try {
        console.log("---req body---", req.body);
        // const { product_name, product_price} = req.body;
        const { title,_dropdownController,_textController,_imgController} = req.body;
        const duplicate = await SubcategoryServices.getUserBysubcategory(title);
        if (duplicate) {
            throw new Error(`Title ${title}, Already added`)
        }
        const response = await SubcategoryServices.addsubcategory( title,_dropdownController,_textController,_imgController);

        res.json({ status: true, success: 'Subcategory added successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.category = async (req, res, next) => { 
    try {
        console.log("---req body---", req.body);
        console.log("---req file---", req.files['_imgController'][0].id);
        // const { product_name, product_price} = req.body;
        const { title,_textController,_imgController} = req.body;
        // const duplicate = await CategoryServices.getUserBycategory(title);
        // if (duplicate) {
        //     throw new Error(`Title ${title}, Already added`)
        // }
        const response = await CategoryServices.addcategory( title,_textController,`${req.files['_imgController'][0].originalname}`, req.files['_imgController'][0].id);

        res.json({ status: true, success: 'Category added successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}
exports.uploadimg = async (req, res, next) => {
    try {
        const { _imgController } = req.body;  
        console.log("------sad--",_imgController); 
        const response = await ImagesServices.addimg(_imgController);
        res.json({ status: true, success: 'image added successfully' });
    }catch (err) {
        console.log("---> err -->", err);
        next(err);
    }

    }

//add category
//************************* */
//get product
exports.GetProduct =  async (req,res,next)=>{
    try {
        // const { userId } = req.body;
        let getdata = await ProductServices.getDataByProduct();
        // res.json({status: true,success:getdata});
        res.json(getdata);
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


//get product

//get prodcate
exports.Getcategproduct =  async (req,res,next)=>{
    try {
        const {_dropdownController} = req.body;
        console.log("--dropdown--",_dropdownController);
        let getdata = await ProductServices.getDataByProductCateg(_dropdownController);
        // res.json({status: true,success:getdata});
        
        res.json(getdata);
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
//get boo
exports.Getboo =  async (req,res,next)=>{
    try {
        const {username} = req.body;
        console.log("--username--",username);
        let getdata = await UserServices.getDataByboo(username);
        // res.json({status: true,success:getdata});
        
        res.json(getdata);
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
exports.Getallbooking = async (req,res,next)=>{
    try{
        // console.log("---req.body----",req.body);
        let getallbooking=await UserServices.getDataallbooking();
        res.json(getallbooking);
    }
    catch (error)
    {
        console.log(error,"err-----");
        next(error);
    }
}
//get boo
//post orderdetails
exports.Postorderdetails =  async (req,res,next)=>{
    try {
        const { username } = req.body;
        console.log("--username--", username);
    
        // Find the user with the matching username and update the document
        const updatedUser = await UserModel.findOneAndUpdate(
          { username: username }, // Match the username
          { $set: { first_name:req.body.first_name,last_name:req.body.last_name,address1: req.body.address1, address2: req.body.address2,mobile_number: req.body.mobile_number,pin_code: req.body.pin_code,image:req.body.image } }, // Update the age and height fields
          { new: true } // Return the updated document
        );
    
        res.json(updatedUser);
      } catch (error) {
        console.log(error, 'err---->');
        next(error);
      }
    
}
//post orderdetails
//get produc
exports.Geteditprofile =  async (req,res,next)=>{
    try {
        const {email} = req.body;
        console.log("--email--",email);
        let getdata = await UserServices.getDataByeditprofile(email);
        // res.json({status: true,success:getdata});
        
        res.json(getdata);
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
//get category
exports.Getcategory =  async (req,res,next)=>{
    try {
        // const { userId } = req.body;
        let getcategory = await CategoryServices.getDataBycategory();
        // res.json({status: true,success:getdata});
        res.json(getcategory);
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
//get category

//get subcategory
exports.Getsubcategory =  async (req,res,next)=>{
    try {
        // const { userId } = req.body;
        let getsubcategory = await SubcategoryServices.getDataBysubcategory();
        // res.json({status: true,success:getdata});
        res.json(getsubcategory);
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
//get subcategory
exports.changestate = async (req, res, next) => {
    try {
        const { email, status, first, _id } = req.body;

        if (!_id) {
            // Handle the case when _id is not present in req.body
            return res.status(400).json({ error: "Missing _id in req.body" });
        }

        let statres = await UserServices.changestatus(email, status, first, _id);
        res.json(statres);
    } catch (error) {
        console.error("error is ----", error);
        // Handle the error and send an appropriate response
        res.status(500).json({ error: "An error occurred" });
    }
}
//f
exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await user.comparePassword(password);

                                                                                                                                                                                                                                                                                                                                                                                                                                        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        // Creating Token

        let tokenData;
        // tokenData = { _id: user._id, email: user.email };
    tokenData=user.email;

        // const token = await UserServices.generateAccessToken(tokenData,"secret","1h")
        // const token = await UserServices.generateAccessToken(tokenData,"secret","1h")

        // res.status(200).json({ status: true, success: "sendData", token: token });
        res.status(200).json({ status: true, success: "sendData", token: tokenData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


//get reg user
exports.RegUser =  async (req,res,next)=>{
    try {
        // const { userId } = req.body;
        let getRuser = await UserServices.getDataByRuser();
        // res.json({status: true,success:getdata});
        res.json(getRuser); //getRuser
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
//get reg user

   

//delete ruser

exports.deleteruser= async(req,res,next)=>{
    try{
        const {email}=req.body;

        let deleteRdata=await UserServices.deleteruser(email);
res.json({status:true,success:deleteRdata});
    }
    catch (error) {
      
        console.log(error, 'err--->');
        next(error)
    } 
}
//delete ruser
//add dropdown
exports.adddropdown= async(req,res,next)=>{
    try{
        console.log("--------req.body-----",req.body); // Log the request body
        const { dropdownname } = req.body;
        console.log("--------dropdownname-----",dropdownname); // Log the parsed value
        const response = await DropdownServices.alldropdown(dropdownname);
      res.json({status:true,success:"dropdown added successfully"});  
    }
    catch (err){
        console.log("-->err-->",err);
        next(err);
    }
}
exports.getdropdowndataa= async(req,res,next)=>{
    try{
        console.log("------req.body--------",req.body);
        let getdropdowndata=await DropdownServices.getdropdowndataservices();
        res.json(getdropdowndata);
    }
    catch (error) {
        console.log(error,"err----");
        next(error);
    }
}
