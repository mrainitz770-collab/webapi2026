const express=require('express');
const app=express();
const routerProduct=require('./api/v1/routes/product')

app.use('/products',routerProduct);

module.exports=app;//יצוא של המודול שכתבנו