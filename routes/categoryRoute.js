const { deleteCategoryController,createCategoryController,updateCategoryController,getAllCategoryController,singleCategoryController } =require ("../controller/categoryController")
const { isAdmin, requireSignIn } =require ("../middleware/authMiddleware")

const express = require("express")
const router= express.Router()

//routes create 
router.post("/create-category",requireSignIn,isAdmin, createCategoryController)
//routes update
router.put("/update-category/:id",requireSignIn,isAdmin, updateCategoryController)
//routes getall 
router.get("/getall-category", getAllCategoryController)
//routes single  
router.get("/single-category/:slug", singleCategoryController)
//routes delete  
router.delete("/delete-category/:id",requireSignIn,isAdmin, deleteCategoryController)



module.exports= router