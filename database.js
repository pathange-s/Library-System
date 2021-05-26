//------------create connection with local database
const mysql = require('mysql');
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234RTyu$',
    database:'USERS'
});
//-------------connect to database
con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
});


module.exports= con;