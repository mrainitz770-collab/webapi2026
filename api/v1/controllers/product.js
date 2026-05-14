module.exports={
    getAll:(req,res)=>{
        (req,res)=>{
    return res.status(200).json({msg:'All Products'})//החזרת תשובה של כל המוצרים
}
    },
    getById:(req,res)=>{
        (req,res)=>{
    const pid=req.params.id;//קבלת קוד המוצר שנשלח
    res.status(200).json({msg:`Get Product Id ${pid}`})
}
    },
    add:(req,res)=>{
        (req,res)=>{
    const pid=req.params.id;//קבלת קוד המוצר להוספה
    res.status(200).json({msg:`Add Product Id ${pid}`})
}
    },
    update:(req,res)=>{(req,res)=>{
    const pid=req.params.id;//קבלת קוד המוצר לעדכון
    res.status(200).json({msg:`update Product Id ${pid}`})
}},
    delete:(req,res)=>{
        (req,res)=>{
    const pid=req.params.id;//קבלת קוד המוצר למחיקה
    res.status(200).json({msg:`Delete Product Id ${pid}`})
}
    }
};