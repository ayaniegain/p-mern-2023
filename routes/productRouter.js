const { deleteProductController,braintreePaymentController,braintreeTokenController,productSortController,productListController,relatedProductController,searchController,createProductController,productFilterController,getAllproductsController,singleproductController, productPhotoController, updateProductController, productCountController } =require ("../controller/productController")
const { isAdmin, requireSignIn } =require ("../middleware/authMiddleware")

const express = require("express")
const router= express.Router()
const formidableMiddleware = require('express-formidable');
 

//routes product create 
router.post("/create-product",requireSignIn,isAdmin,formidableMiddleware(), createProductController)
//routes get  all

router.get("/getall-product", getAllproductsController)

//routes get  single
router.get("/single-product/:slug", singleproductController)

//routes delete  
router.delete("/delete-product/:id", deleteProductController)

//photo get route 
router.get("/photo-product/:pid", productPhotoController)

//routes update  

router.put("/update-product/:pid",requireSignIn,isAdmin,formidableMiddleware(),updateProductController);

//filter product
router.post("/product-filters",productFilterController);

//sort product
router.get("/product-sort",productSortController);

// // product count 

// router.get("/product-count",productCountController);

// //product list 

// router.get("/product-list/:page",productListController);


// search product

router.get("/search/:keyword",searchController);

//similer Products

router.get('/related-product/:pid/:cid',relatedProductController)

//payment routes
router.get("/braintree/token",braintreeTokenController);

// payments
router.post("/braintree/payment", requireSignIn,braintreePaymentController)

module.exports= router