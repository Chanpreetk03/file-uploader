require("dotenv").config();
//app create
const express=require("express");
const app=express();

//PORT
const PORT=process.env.PORT || 5000

//Middleware
app.use(express.json());
const fileUpload=require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

//db connection
const db=require("./config/database");
db.connect();

//cloud connection
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api rout mounting
const Upload=require("./routes/FileUpload");
app.use('/api/v1' , Upload);

//activate server
app.listen(PORT , ()=>{
    console.log(`App is running at ${PORT}`);
})