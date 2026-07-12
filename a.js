let obj={
    // pid:5,
    pname:'bread',
    price:52,
    pdesc:'ddd',
    cid:4
}

//console.log(obj);
let sql='update t_product set ';
let arr=Object.keys(obj);// מייצרת מערך של כל השדות שיש באובייקט
for(let i=0;i<arr.length;i++)
{
    sql +=`${arr[i]}='${obj[arr[i]]}',`;
}
sql=sql.substring(0,sql.length-1);
let pid=7;
sql+=' Where pid='+pid;
console.log(sql);
//console.log(obj['price'])
