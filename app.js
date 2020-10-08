const express = require('express');
const mongoose = require('mongoose')

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require("dotenv");

require('dotenv').config()


//import routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');

//app
const app = express();

  //db
  mongoose 
  .connect(process.env.DATABASE,{
      // UseNewUrlParser:true,
      // useCreateIndex:true
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true  
  }).then(()=>{
      console.log('DB Connected')
  }).catch(err => console.log('DB CONNECTION ERROR: ', err));


  //middlewares
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(expressValidator());
  app.use(cors());

//import route middlware
app.use('/api',authRoutes);
app.use('/api',categoryRoutes);

if(process.env.NODE_ENV=="production"){
    app.use(express.static('monech-frontend/build'))
    const path=require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'monech-frontend','build','index.html'))
    })
} 


const port  = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})