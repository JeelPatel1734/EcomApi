const router = require("express").Router();
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv:" +
    "//" +
    "DeopersEcom" +
    ":" +
    "Welcome2022" +
    "@ecomapi.2xlgwcq.mongodb.net/ecom?retryWrites=true&w=majority"
);

 db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
    let db=mongoose.connections[0].db;
    gridBucket = new mongoose.mongo.GridFSBucket(db,{
        bucketName:"fs"
    }); 
});  
const multer=require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const path=require('path')
const url="mongodb+srv" +"://" +"DeopersEcom" +":" +"Welcome2022" +"@ecomapi.2xlgwcq.mongodb.net/ecom"


// import {gridStorage} from '../utils/common';
const storage = new GridFsStorage({url});
const upload = multer({ storage });
const gridStorage= require('../utils/common.js')
const ErrResponse = require('../utils/errorresponse.js');


const cpUpload = upload.fields([{ name: '_imgController', maxCount: 1 },

])
const cpproduct = upload.fields([{ name: '_imgController', maxCount: 1 },
{ name: '_multiimgController', maxCount: 4 }
])


const UserController = require('../controller/user.controller');
const { route } = require("../../app.js");
let storageFS= new GridFsStorage(
    {
        url,file:(req,file)=>{
            return {
                filename:file.orignalname,
                bucketName: "fs"
            };
        }
    }
)

const Grid = mongoose.model('Grid', new mongoose.Schema({}), 'fs.files');

router.get('/gridStorage/:fileName', (req, res) => {
    try {
        const paramFileName = req.params.fileName;

        // Use the Grid model to find the file details
        Grid.findOne({ filename: paramFileName }).exec()
        .then((file) => {
            if (!file) {
                res.status(404).send('File not found');
            } else {
                const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                    bucketName: 'fs'
                });

                const downloadStream = bucket.openDownloadStreamByName(paramFileName);
                downloadStream.pipe(res);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('Error finding file');
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(new ErrResponse(400, error.message));
    }
});
  //get aggregation
  const categoriesSchema = new mongoose.Schema({
    _id: String,
    title: String,
    _textController: String,
    _imgController: String,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
    _imgRef: String,
    
  });
  
  const categories = mongoose.model('categories', categoriesSchema);
  router.get('/aggregate', async (req, res) => {
    try {
      const aggregationResult = await categories.aggregate([
        {
          $lookup: {
            from: 'fs.files',
            localField: '_id ',
            foreignField: '_imgRef',
            as: 'filename'
          }
        },
        {
          $limit: 1
        }
      ]);
  
      if (aggregationResult.length === 0) {
        return res.status(404).json({ error: 'No matching documents found' });
      }
  
      res.json(aggregationResult);
    } 
    catch (error) {
        console.error('Error during aggregation:', error);
        console.error('Error message:', error.message);
        console.error('Error stack trace:', error.stack);
        res.status(500).json({ error: 'An error occurred during aggregation' });
      }
  });
  
  //get aggregation
router.post("/changestate", UserController.changestate);
router.post("/category",cpUpload, UserController.category);
router.post("/register",UserController.register);
router.post("/addbookingdetails",UserController.addbookingdetails);

router.post("/login", UserController.login);
router.post("/uploadimg", UserController.uploadimg);
//route for deleting the  reg user

router.post("/deleteruser",UserController.deleteruser)
//route for deleting the  reg user
router.get("/getRuser", UserController.RegUser);
router.get("/getimg", UserController.img);
router.post("/addproduct",cpproduct,UserController.AddProduct);
router.get("/getproduct",UserController.GetProduct);
//
//req
router.post("/getcategproduct",UserController.Getcategproduct);
//req bo

router.post("/getboo",UserController.Getboo);
router.get("/getallbooking",UserController.Getallbooking);
//req bo
router.post("/postorderdetails",UserController.Postorderdetails);
//req  
router.post("/geteditprofile",UserController.Geteditprofile);

//
router.post("/subcategory", UserController.subcategory);

router.get("/getcategory",UserController.Getcategory);
router.get("/getsubcategory",UserController.Getsubcategory);
router.post("/dropdown",UserController.adddropdown);
router.get("/getdropdowndata",UserController.getdropdowndataa);
        
module.exports = router;

   

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads");
//     },
//     filename:(req,file,cb)=>{
//         console.log(path.basename(file.originalname));
//         cb(null,file.originalname)
//     }
// })
// const upload=multer({
//     storage:storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // 5 MB
//       },
    // dest:'Images'
// });
    
