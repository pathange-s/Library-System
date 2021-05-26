var express = require('express');
const checkoutRouter = express.Router();
var con=require('../database');
const checkout = express();
var appRouter = require('../app');
const session = require('express-session');
var sess;


checkoutRouter.post('/checkout',(req,res,next)=>{
    console.log("CHECKING OUT BOOKS");
     var books_id = JSON.parse(req.body.book);
    
    for (var i = 0; i < books_id.length; i++){

        console.log(books_id[i]);
    }
    
    //console.log(stringEmail+"-----------");
    //=========================================================updating Book_Status
    for (var i = 0; i < books_id.length; i++){
        sess = req.session;

        var stringEmail = sess.email;
        //console.log(stringEmail+"-----------");
        var sql = "INSERT INTO Books_Status (User_Email,Book_ID,Status) VALUES ('"+stringEmail+"', '"+books_id[i]+"', 'Request')"; 

        con.query(sql, function (err, result) {     
        if (err) throw err;  
        });         
    }
    console.log("Book Status(es) Updated");  
    

    //console.log(books_id);
    //res.send(req.body);
    
});


module.exports = checkoutRouter;