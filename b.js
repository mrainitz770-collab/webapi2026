const bcrypt=require('bcrypt');
const pass="defghis";
const roundSalt=10;
bcrypt.hash(pass,roundSalt).then((hashPass)=>{//פונקציה שמקבלת סיסמה ומצפינה אותה
    console.log(hashPass);
    // bcrypt.compare(pass,hashPass).then();
}).catch((err)=>{
    
})
let hashPass="$2b$10$wq1KUmYevWk6eBQBLKQQsuOMMWchpXB0lpGqxyld6b.dKsQA8Wo6";
bcrypt.compare(pass,hashPass).then((status)=>{//פונקציה שמקבלת סיסמה ובודקת אם היא מתאימה להצפנה שיש בדאטא בייס
    
    if(status)
        console.log('good')
    else
        console.log('not good')
})