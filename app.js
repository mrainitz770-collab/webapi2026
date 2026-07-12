require('dotenv').config();//הפעלת פונקציה שטוענת את קובץ דוט איאנוי
const express=require('express'); // חיבור לספריית אקספרס
const app=express();// יצמירת אפליקיית אקספרס
const routerProduct=require('./api/v1/routes/product');// ייבוא של הראוטר של המוצרים
const routerUser=require('./api/v1/routes/user');//ייבוא של הראוטר יוזרס
const routerCategory=require('./api/v1/routes/category');
const morgan=require('morgan');
const myLog=require('./api/v1/middlewares/myLog');// צירפנו את שכבת הלוג שבנינו
// const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const session=require('express-session');
const MongoStore=require('connect-mongo').default;
mongoose.pluralize(null);

const auth=require('./api/v1/middlewares/auth');
const connStr=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}${process.env.MONGO_SRV}/ecomdb`
console.log(connStr);
mongoose.connect(connStr).then((conn)=>{
    console.log('Con')
})

app.use(session({
    secret:process.env.PRIVATE_KEY,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create(
        {
            mongoUrl:connStr      

        }
),
    cookie:{
        path:'/',
        secure:false
     

    }
}));
// new comment
// const myLog=(req,res,next)=>{
//       console.log(`${req.}`);
// }
// app.use((req,res,next)=>{
//     const arrAllowList=['127.0.0.1','::1'];;
//    // for()
// });
// app.use((req,res,next)=>{
//     if(req.method=='GET' && req.path=='/product')
//     {
//         return res.status(200).json({msg:'all Products'});
//     }
//     else{
//         next();
//     }
// });
//app.use(myLog);// הוספת שכבת הלוג שצירפנו אל האפליקציה
// נוסיף שכבת ביניים שמטפלת בגוף של הבקשה הנשלחת בפורמט ג'ייסון
// app.use(morgan('dev'));// הוספת שכבה שמבצעת רישום של כל בקשה במערכת אל הקונסול, משמש אותנו לצורך מעקב ובקרה
app.use(express.json());
app.use(express.urlencoded());
app.use('/product', routerProduct);// שילוב של הראוטר מוצרים באפליקציה
app.use('/user',routerUser);//שילוב של ראוטר יוזר
app.use('/category' ,routerCategory)
module.exports=app;// ייצוא של המודול שכתבנו