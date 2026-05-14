const router=require('express').Router(); //יצירת אובייקט של ראוטר עבור הניתובים
const productController=require('../controllers/product')//חיבור לקונטרול
//מקבלת שני פרמטרים הראשון נתיב של הבקשה, והשני קוד שרת לביצוע המורכב מאובייקטים של בקשה ותשובה
router.get('/',productController.getAll);//פניה בשיטת גט לשרת

router.get('/:id',productController.getById)


router.delete('/:id',productController.delete)
router.post('/',productController.add)
router.put('/:id',productController.update)

module.exports=router;