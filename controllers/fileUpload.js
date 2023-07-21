const File=require("../models/File");

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
        
    }
}
