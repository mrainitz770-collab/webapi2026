const jwt=require('jsonwebtoken');

const date={Uid:5,Email:"a@a"};
const pk="Menachem"
const token=jwt.sign(date, pk, {expiresIn: '1h'});
console.log(token);


const newDate=jwt.verify(token);
console.log(newDate) ;   

