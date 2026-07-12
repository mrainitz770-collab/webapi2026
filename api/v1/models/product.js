const mongoose=require('mongoose')
mongoose.pluralize(null);

const productSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pid:Number,
    pname:String,
    price:Number,
    pdesc:String,
    picname:String,
    cid:Number
});

const productModel=mongoose.model('product',productSchema);

module.exports=productModel;