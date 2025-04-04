const url="mongodb+srv" +"://" +"DeopersEcom" +":" +"Welcome2022" +"@ecomapi.2xlgwcq.mongodb.net/ecom"
const multer=require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
 function gridStorage(){
    console.log('uploadGrid',url)
    let storageFS= new GridFsStorage(
        {
            url,file:(req,file)=>{
                return {
                    filename:file.orignalname,
                    bucketName: "fs"
                }
            }
        }
    )
    let uploadGrid=multer({Storage:storageFS})
  
    return uploadGrid
}

