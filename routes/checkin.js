var express = require('express');
const checkinRouter = express.Router();
var con=require('../database');
const checkin = express();
var appRouter = require('../app');
const session = require('express-session');
var sess;


checkinRouter.post('/checkin',(req,res,next)=>{
    console.log("CHECKING IN BOOKS");
     var books_id = JSON.parse(req.body.book);
    
    //=========================================================updating Book_Status
    for (var i = 0; i < books_id.length; i++){
       // console.log(books_id[i]+"+++++++++++++++++++");
       //local id stores request id 
        var localID = books_id[i];
                // //================================= decrement count of boooks in librarby by 1        
                var sql_init =  "SELECT * FROM Books WHERE book_id='"+books_id[i]+"'";

                con.query(sql_init, function (err, result,fields) {     
                     if (err) throw err;  
                            
                         Object.keys(result).forEach(function(key) { 
                             var row = result[key];
                             var prevCount = row.book_count;
                             var newCount = parseInt(prevCount) + 1;
                             // console.log(newCount);
                             var updateQuery = "UPDATE Books SET book_count = "+newCount+" WHERE book_id = "+localID+"";
                            
                             con.query(updateQuery,function(err,result){
                                 if (err) throw err;  
                                 //console.log("Book Count After Checkin Updated");  
        
                             });
        
        
                           });
                        
                        
         
                 });

        sess = req.session;
        var stringEmail = sess.email;
        //console.log(stringEmail+"-----------");
        var updateQuery = "UPDATE Books_Status  SET Status='Returned' WHERE Request_ID = "+localID+"";
        con.query(updateQuery, function (err, result) {     
        if (err) throw err;  



        });         
        
    }
    

    res.redirect('/approvedbooks');
    console.log("YOUR BOOKS || Book Status(es) Updated");  
    
});


module.exports = checkinRouter;