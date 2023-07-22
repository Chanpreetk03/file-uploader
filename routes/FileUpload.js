const express=require("express");
const router=express.Router();

const {imageUpload, vidUpload , imageSizeReducer,localFileUpload}=require("../controllers/fileUpload");

//api routes
router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);
router.post("/vidUpload" , vidUpload);
router.post("/imageSizeReducer" , imageSizeReducer);

module.exports=router;