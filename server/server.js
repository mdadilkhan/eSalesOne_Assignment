require('dotenv').config()
const express = require('express')
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// db connection import
const connectToDatabase = require('./db/db');

// router inport
const authRouter = require('./route/auth.route');
const productRouter = require('./route/product.route');


const app=express();

//cors allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://sub.yourdomain.com",
    "https://anotherdomain.com"
  ];
  


  const corsOptions = {
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // ✅ Allow cookies & Authorization headers
    optionsSuccessStatus: 204,
  };



app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Testing route
app.get('/',(req,res)=>{
    res.status(200).send('<div style="height:100vh; color: blue; font-size:40px; display: flex; justify-content:center; align-items:center;">Testing Success</div>');
  })



//Actual Route

app.use('/api',authRouter);
app.use('/api',productRouter)



const PORT =process.env.PORT || 30000

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if the database connection fails
  });

