const mongoose=require("mongoose");
const nodemailer=require("nodemailer")
require("dotenv").config();
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});


//post middleware

fileSchema.post("save" , async function(doc){
    try {
        console.log("doc :" , doc);
        //transporter
        let transporter=nodemailer.transporter({
            host:process.env.MAIL_HOSt,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
        //send mail
        let info=await createTransport.sendMail({
            from:`fileUploader`,
            to:doc.email,
            subject:"new file uploaded",
            html:"new file uploader go check"
        })

    } catch (error) {
        console.error(error) 
    }
})

const File=mongoose.model("File" , fileSchema);
module.exports=File;