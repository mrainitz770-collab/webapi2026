//const express=require('express'); // חיבור לספריית אקספרס
const router=require('express').Router();// יצירת אוביקט של ראוטר עבור הניתובים
const productController=require('../controllers/product');// חיבור לקונטרול
// הפונקציה מקבלת שני פרמטרים, הראשון נתיב של הבקשה, והשני קוד שרת לביצוע המורכב מאוביקטים של בקשה ותשובה
router.get('/',productController.getAll);// בקשה בשיטת גט לשרת

router.get('/:id',productController.getById);
router.delete('/:id',productController.delete);

router.post('/',productController.add);

router.put('/:id',productController.update);

module.exports=router;// ייצוא של הראוטר