const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

//localFileUpload ->handler function
exports.localFileUpload=async (req,res)=>{
    try {
        //fetch file
        const file=req.files.file;
        console.log("file found ",file);

        //create [ath for file storage
        let path=__dirname+"/files"+Date.now() +`${file.name.split('.')[1]}`; 
        
        //app path to mv function
        file.mv(path,(err)=>{
            console.log(err);
        });

        //create response
        res.json({
            success:true,
            message:"file uploaded successfully"
        })

    } catch (error) {
        console.log("not able to upload file on server");
        console.log(error)
    }
}

function isFileSupported(type,supportedTypes){
    return supportedTypes.include(type);
}

async function uploadFileToCloudinary(file,folder , quality){
    const options={folder};
    console.log("temp file path" , file.tempFilePath);
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

//image upload handler
exports.imageUpload=async(req,res)=>{
    try {
        //fetch data
        const{name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.file.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg", "jpeg" , "png"];
        const fileType=file.name.split(".")[0].toLowerCase();
        console.log(`file type: ${fileType}`)
        if(!isFileSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file not supported"
            })
        }

        //upload on cloudinary
        console.log("uploading to file-upload-app")
        const response=await uploadFileToCloudinary(file,"file-upload-app");
        
        //db entry save
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"Image uploaded"
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
}

//video upload handler

exports.videoUpload=async (req,res)=>{
    try {
        //fetch data
        const{name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.file.vidFile;
        console.log(file);

        //validation
        const supportedTypes=["mp4", "mov"];
        const fileType=file.name.split(".")[0].toLowerCase();
        console.log(`file type: ${fileType}`)
        if(!isFileSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file not supported"
            })
        }

        //upload on cloudinary
        console.log("uploading to file-upload-app")
        const response=await uploadFileToCloudinary(file,"file-upload-app");
        
        //db entry save
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"video uploaded"
        })


    } catch (error) {
        console.error(error)
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
}

//image size reducer handler 

exports.imageSizeReducer=async(req,res)=>{
    try {
        //fetch data
        const{name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.file.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg", "jpeg" , "png"];
        const fileType=file.name.split(".")[0].toLowerCase();
        console.log(`file type: ${fileType}`);


        if(!isFileSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file not supported"
            })
        }

        //upload on cloudinary
        console.log("uploading to file-upload-app")
        const response=await uploadFileToCloudinary(file,"file-upload-app" , 30);
        
        //db entry save
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"Image uploaded"
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
}