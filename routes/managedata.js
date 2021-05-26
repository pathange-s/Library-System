var express = require('express');
const managedataRouter = express.Router();
var con=require('../database');
const checkout = express();
var appRouter = require('../app');
const session = require('express-session');
var sess;


managedataRouter.post('/managedata',(req,res)=>{

    console.log("Check test 2 || HERE IN MANAGE DATA"); 
    var Requests_ID_Array = JSON.parse(req.body.request);
    

    // give approval / change database

    for (var i = 0; i < Requests_ID_Array.length; i++){
        
        // //================================= decrement count of boooks in librarby by 1        

        var sql_init =  "SELECT * FROM Books INNER JOIN Books_Status USING(Book_ID) WHERE Request_ID='"+Requests_ID_Array[i]+"'";

        con.query(sql_init, function (err, result,fields) {     
             if (err) throw err;  
                    
                 Object.keys(result).forEach(function(key) { 
                     var row = result[key];
                     var prevCount = row.book_count;
                     var newCount = parseInt(prevCount) - 1;
                     // console.log(newCount);
                     var updateQuery = "UPDATE Books SET book_count = "+newCount+" WHERE book_id = "+row.book_id+"";
                    
                     con.query(updateQuery,function(err,result){
                         if (err) throw err;  
                         //console.log("Book Count After Checkout Updated");  

                     });


                   });
                
                
 
         });

        //console.log(Requests_ID_Array[i]);
        var localID = Requests_ID_Array[i];
        var updateQuery = "UPDATE Books_Status SET Status = 'Approved' WHERE Request_ID = "+localID+"";
        
        con.query(updateQuery,function(err,result){
            if (err) throw err;  
            //console.log("Book Count After Checkout Updated");  
        });
    }
    
    console.log("Data Managed by ADMIN|| APPROVALS DONE");  
    res.redirect('/managebooks');

});


module.exports = managedataRouter;