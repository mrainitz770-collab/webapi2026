//const express=require('express'); // חיבור לספריית אקספרס
const router=require('express').Router();// יצירת אוביקט של ראוטר עבור הניתובים
const categoryController=require('../controllers/category');// חיבור לקונטרול
// הפונקציה מקבלת שני פרמטרים, הראשון נתיב של הבקשה, והשני קוד שרת לביצוע המורכב מאוביקטים של בקשה ותשובה
router.get('/',categoryController.getAll);// בקשה בשיטת גט לשרת

router.get('/:id',categoryController.getById);
router.delete('/:id',categoryController.delete);

router.post('/',categoryController.add);

router.put('/:id',categoryController.update);

module.exports=router;// ייצוא של הראוטר