require('dotenv').config();
const mongoose=require('mongoose')


const connStr=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}:${process.env.MONGO_SRV}/?appName=EcommCluster`
const productSchema=mongoose.Schema({
    _id:new mongoose.Types.ObjectId,
    pid:Number,
    pname:String,
    price:Number,
    pdesc:String,
    picname:String,
    cid:Number
});

const productModel=mongoose.model('product',productSchema);

main();

async function main()
{
const conn=await mongoose.connect(connStr);
const date=await productModel.find();
console.log(date);
}



