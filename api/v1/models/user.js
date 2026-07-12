const mongoose=require('mongoose')
mongoose.pluralize(null);

const userSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uid:Number,
    fullname:String,
    email:String,
    pass:String
});

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;