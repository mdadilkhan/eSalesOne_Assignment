const env= require('dotenv')
const express = require('express')
env.config()

const app=express();





const PORT =process.env.PORT || 30000
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
    
})