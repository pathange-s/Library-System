var express = require('express');
const checkoutRouter = express.Router();
var con=require('../database');
const checkout = express();
var appRouter = require('../app');


checkoutRouter.post('/checkout',(req,res,next)=>{
    console.log("CHECKING OUT BOOKS");
     var books_id = JSON.parse(req.body.book);
    
    for (var i = 0; i < books_id.length; i++){

        console.log(books_id[i]);
    }
    // var stringEmail = appRouter.getEmail();
    // console.log(stringEmail+"-----------");
    
    
    
    // var sql = "INSERT INTO USERS_DATA (,Email,Password) VALUES ('"+name+"', '"+email+"', '"+password+"')";  
    //         con.query(sql, function (err, result) {     
    //         if (err) throw err;  
    //         console.log("USER DATA INSERTED");  
    //         }); 

    
    //console.log(books_id);
    //res.send(req.body);
    
});


module.exports = checkoutRouter;