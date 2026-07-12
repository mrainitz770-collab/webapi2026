
const productModel=require('../models/product');
module.exports={
    getAll:async (req,res)=>{
       try
       {
           const data=await productModel.find();
           return res.status(200).json(data);
//   return  res.status(200).json({msg:`All products`});// החזרת תשובה של כל המוצרים
       }
       catch(err)
       {
            return res.status(500).json(err);
       }

    },
    getById:async (req,res)=>{
    const pid=req.params.id;// קבלת קוד המוצר שנשלח
     try
       {
           const data=await productModel.find({pid});
           return res.status(200).json(data);
//   return  res.status(200).json({msg:`All products`});// החזרת תשובה של כל המוצרים
       }
       catch(err)
       {
            return res.status(500).json(err);
       }

    
},
    add:async(req,res)=>{

        try
       {
           const data=await productModel.insertOne(req.body);
           return res.status(200).json(data);
//   return  res.status(200).json({msg:`All products`});// החזרת תשובה של כל המוצרים
       }
       catch(err)
       {
            return res.status(500).json(err);
       }
    // הוספת מוצר חדש
   
    
},
    update:async (req,res)=>{
         try
       {
           const pid=req.params.id;
           const data=await productModel.apdateOne({pid},req.body);
           return res.status(200).json(data);
//   return  res.status(200).json({msg:`All products`});// החזרת תשובה של כל המוצרים
       }
       catch(err)
       {
            return res.status(500).json(err);
       }
   
},
    delete:async(req,res)=>{ try
       {
           const data=await productModel.delete(req.body);
           return res.status(200).json(data);
//   return  res.status(200).json({msg:`All products`});// החזרת תשובה של כל המוצרים
       }
       catch(err)
       {
            return res.status(500).json(err);
       }
  
}
}
