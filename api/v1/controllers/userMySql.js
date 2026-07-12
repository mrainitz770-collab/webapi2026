const mySqlDb=require('../models/mysqldb');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken'); 
module.exports={
    getAll:(req,res)=>{
        const sql='select * from t_user';// שאילתה המחזירה את כל המוצרים
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
   });// הפעלת השאילתה וקבלת התוצאות בתוך פונקציית החזרה
//   return  res.status(200).json({msg:`All users`});// החזרת תשובה של כל המוצרים
   },  
    getById:(req,res)=>{
    const pid=req.params.id;// קבלת קוד המוצר שנשלח
     const sql=`select * from t_user where pid=${pid}`;// שאילתה המחזירה את כל המוצרים
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
    add:(req,res)=>{
    // הוספת משתמש חדש
   
    let data=req.body;// שמירת התוכן שנשלח בגוף הבקשה
    let arr=Object.keys(data);// מייצרת מערך של כל השדות שיש באובייקט
    let fields='';
    let values='';
    let sql=`SELECT * FROM t_user WHERE email='${data.email}'`
    mySqlDb.query(sql,(err, results, fld)=>{
        if (err != null){
            console.log(results);
            return res.status(500).json({'error': err.message});
        }
        else if (results.length > 0)
        {
            return res.status(201).json({ msg: 'User Already Exist'})
        }
         for(let i=0;i<arr.length;i++)
    {
        if(arr[i]=='pass')
        {
            let pass=data[arr[i]];
            let hashPass=bcrypt.hashSync(pass,10)
            fields+=`${arr[i]},`;
            values+=`'${hashPass}',`;

        }
        else
        {
            fields+=`${arr[i]},`;// pname,price,cid
            values+=`'${data[arr[i]]}',`;// ' 'bread',50,99
        }
        
    }   
    console.log(fields);
    fields=fields.substring(0,fields.length-1);// בטל פסיק מיותר בסוף
    values=values.substring(0,values.length-1);// בטל פסיק מיותר בסוף
    let sql=`INSERT INTO t_user (${fields}) VALUES (${values})`;
    console.log((sql));
     mySqlDb.query(sql,(err,results,fld)=>{
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


    })
   
},
    update:(req,res)=>{
    const pid=req.params.id;// קבלת קוד המוצר לעדכון
    let sql='update t_user set ';
    let data=req.body;// שמירת התוכן שנשלח בגוף הבקשה
    let arr=Object.keys(data);// מייצרת מערך של כל השדות שיש באובייקט

    for(let i=0;i<arr.length;i++)
    {
        sql +=`${arr[i]}='${data[arr[i]]}',`;// מעבר על כל רשימת השדות ויצירה של משפט עם ערכים לעדכון
    }
    sql=sql.substring(0,sql.length-1);// בטל פסיק מיותר בסוף

    sql+=' Where pid='+pid;
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
login:(req,res)=>{
    let data=req.body;// שמירת התוכן שנשלח בגוף הבקשה
    
    let sql=`SELECT * FROM t_user WHERE email='${data.email}'`; 
    mySqlDb.query(sql,(err, results)=>{
        if (err != null){//אם יש שגיאה במערכת
            console.log(results);
            return res.status(500).json({status: false,error:err.message,data:[]});
        }
        else if (results.length == 0)//אם המשתמש לא נמצא
        {
            return res.status(201).json({ status: false,erorr:null,data:[]})
        }
        //המשתמש נמצא ועכשיו נבדוק את תקינות הסיסמה
        let user=results[0]
        bcrypt.compare(data.pass,user.pass,(err,same)=>{

            if(err != null)//אם יש שגיאה במערכת
            {
                console.log(err)
                return res.status(500).json({ status: false,erorr:null,data:[]})
            }
            if(same==true)//אם ההצפנה מתאימה לסיסמה שניתנה
            {
                const token=jwt.sign({uid:user.uid,email:user.email},process.env.PRIVATE_KEY,{expiresIn:'1h'});
                 return res.status(200).json({ status: true,erorr:null,data:results,token});
            } 
            //אם הסיסמה לא מתאימה
            else{
                 return res.status(500).json({ status: false,erorr:null,data:[]});
            }

        })
       } );
    
}
}
