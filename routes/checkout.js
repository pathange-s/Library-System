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
    
    //=========================================================updating Book_Status
    for (var i = 0; i < books_id.length; i++){
       // console.log(books_id[i]+"+++++++++++++++++++");
        var localID = books_id[i];
                // //================================= decrement count of boooks in librarby by 1        
                var sql_init =  "SELECT * FROM Books WHERE book_id='"+books_id[i]+"'";

                con.query(sql_init, function (err, result,fields) {     
                     if (err) throw err;  
                            
                         Object.keys(result).forEach(function(key) { 
                             var row = result[key];
                             var prevCount = row.book_count;
                             var newCount = parseInt(prevCount) - 1;
                             // console.log(newCount);
                             var updateQuery = "UPDATE Books SET book_count = "+newCount+" WHERE book_id = "+localID+"";
                            
                             con.query(updateQuery,function(err,result){
                                 if (err) throw err;  
                                 //console.log("Book Count After Checkout Updated");  
        
                             });
        
        
                           });
                        
                        
         
                 });

        sess = req.session;
        var stringEmail = sess.email;
        //console.log(stringEmail+"-----------");
        var sql = "INSERT INTO Books_Status (User_Email,Book_ID,Status) VALUES ('"+stringEmail+"', '"+books_id[i]+"', 'Request')"; 
        con.query(sql, function (err, result) {     
        if (err) throw err;  



        });         
        
    }
    

    res.redirect('/books');
    console.log("Book Status(es) Updated");  
    
});


module.exports = checkoutRouter;