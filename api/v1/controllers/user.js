const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken'); 
const userModel = require('../models/user');
module.exports={
    getAll:async(req,res)=>{
         try
       {
           const data=await userModelModel.find();
           return res.status(200).json(data);
//   return  res.status(200).json({msg:`All products`});// החזרת תשובה של כל המוצרים
       }
       catch(err)
       {
            return res.status(500).json(err);
       }
       
   // הפעלת השאילתה וקבלת התוצאות בתוך פונקציית החזרה
//   return  res.status(200).json({msg:`All users`});// החזרת תשובה של כל המוצרים
   },  
    getById:async(req,res)=>{
    const uid=req.params.id;// קבלת קוד המוצר שנשלח
    try
       {
           const data=await userModel.find({uid});
           return res.status(200).json(data);
//   return  res.status(200).json({msg:`All products`});// החזרת תשובה של כל המוצרים
       }
       catch(err)
       {
            return res.status(500).json(err);
       }
}, 
    add:async (req,res)=>{
    // הוספת משתמש חדש
    let data=req.body;
    const arrUsers = userModel.find({ email: data.email });
    if(arrUsers.length>0)
    {
        return res.status(200).json({msg:'user already exist'})
    }

    const hashPass=await bcrypt.hash(data.pass,10);
    data.pass=hashPass;
     const resdata=await userModelModel.insertOne(data);
           return res.status(200).json(resdata);
        
    
    
    
    
    
    
    
    
      
   
},
    update:async (req,res)=>{
    const uid=req.params.id;
    const data=req.body;
    if(data.pass!=undefined)
        data.pass=await bcrypt.hash(data.pass,10);
    const updateUser=await userModel.updateOne({uid:uid},data);
    return res.status(200).json(updateUser)
   
},
    delete:(req,res)=>{
   const pid=req.params.id;// קבלת קוד המוצר שנשלח
     const sql=`delete from t_user where pid=${pid}`;// שאילתה המחזירה את כל המוצרים
        mySqlDb.query(sql,(err,results,feilds)=>{
            if(err==null)
            {
                console.log(results);
                return res.status(200).json(results);
            }
            else
            {
                console.log(err);
                return res.status(500).json({'error':err.message});
                
            }
            });
},
login:async (req,res)=>{
    let data=req.body;// שמירת התוכן שנשלח בגוף הבקשה
    let users=await userModel.find({email:data.email});
    if(users.length==0)
    {
        return res.status(200).json({msg:`User / pass not found`});
    }
    let user=users[0];
    let status=await bcrypt.compare(data.pass, user.pass);
    if(status==false)
    {
        return res.status(200).json({msg:`User / pass not found`});
    }
    const token=jwt.sign({uid:user.uid,email:user.email},process.env.PRIVATE_KEY,{expiresIn:'1h'});
    return res.status(200).json({ status: true,erorr:null,data:results,token});
    
    
    
    
  
    
}
}
