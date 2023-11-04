const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const cors =require("cors")
const authRoutes  = require("./routes/authRoute");
const categoryRoutes  = require("./routes/categoryRoute");
const productRoutes  = require("./routes/productRouter");
const path =require('path')

//config env
dotenv.config();

// database config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

//Routes 
app.use("/api/v1/auth",authRoutes );
app.use("/api/v1/category",categoryRoutes );
app.use("/api/v1/product",productRoutes );
app.use(express.static(path.join(__dirname, './client/build')) );
//port
const PORT = process.env.PORT ||8080 ;


//rest api
app.use('*',(req,res)=>{
  res.sendFile (path.join(__dirname,'./client/build/index.html'),(err)=>{
    res.status(500).send(err)
  })
})

//run listen
app.listen(8080, () => {
  console.log(`listen PORT ${process.env.DEV_MODE} no ${PORT}`.bgYellow.bold);
});


