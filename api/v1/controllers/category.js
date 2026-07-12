const mySqlDb=require('../models/mysqldb');
module.exports={
    getAll:(req,res)=>{
        const sql='select * from t_category';// שאילתה המחזירה את כל המוצרים
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
//   return  res.status(200).json({msg:`All categorys`});// החזרת תשובה של כל המוצרים
   },   getById:(req,res)=>{
    const uid=req.params.id;// קבלת קוד המוצר שנשלח
     const sql=`select * from t_category where uid=${uid}`;// שאילתה המחזירה את כל המוצרים
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
    // הוספת מוצר חדש
   
    let data=req.body;// שמירת התוכן שנשלח בגוף הבקשה
    let arr=Object.keys(data);// מייצרת מערך של כל השדות שיש באובייקט
    let fields='';
    let values='';
    for(let i=0;i<arr.length;i++)
    {
        fields+=`${arr[i]},`;// pname,price,cid
        values+=`'${data[arr[i]]}',`;// ' 'bread',50,99
    }   
    fields=fields.substring(0,fields.length-1);// בטל פסיק מיותר בסוף
    values=values.substring(0,values.length-1);// בטל פסיק מיותר בסוף
    let sql=`INSERT INTO t_category (${fields}) VALUES (${values})`;
    
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
    update:(req,res)=>{
    const uid=req.params.id;// קבלת קוד המוצר לעדכון
    let sql='update t_category set ';
    let data=req.body;// שמירת התוכן שנשלח בגוף הבקשה
    let arr=Object.keys(data);// מייצרת מערך של כל השדות שיש באובייקט
    for(let i=0;i<arr.length;i++)
    {
        sql +=`${arr[i]}='${data[arr[i]]}',`;// מעבר על כל רשימת השדות ויצירה של משפט עם ערכים לעדכון
    }
    sql=sql.substring(0,sql.length-1);// בטל פסיק מיותר בסוף

    sql+=' Where uid='+uid;
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
   const uid=req.params.id;// קבלת קוד המוצר שנשלח
     const sql=`delete from t_category where uid=${uid}`;// שאילתה המחזירה את כל המוצרים
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
}
}
