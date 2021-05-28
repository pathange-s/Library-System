var express = require('express');
const managedata0Router = express.Router();
var con=require('../database');
const checkout = express();
var appRouter = require('../app');
const session = require('express-session');
var sess;


managedata0Router.post('/managedata0',(req,res)=>{

    console.log("Check test 3 || HERE IN MANAGE DATA (DENY)"); 
    var Requests_ID_Array = JSON.parse(req.body.request);
    

    // give ==================Denial=============== / change database

    for (var i = 0; i < Requests_ID_Array.length; i++){
        //console.log(Requests_ID_Array[i]);
        var localID = Requests_ID_Array[i];
        var updateQuery = "UPDATE Books_Status SET Status = 'Denied' WHERE Request_ID = "+localID+"";
        
        con.query(updateQuery,function(err,result){
            if (err) throw err;  
            //console.log("Book Count After Checkout Updated");  
        });
    }
    
    console.log("Data Managed by ADMIN|| DENIAL DONE");  
    res.redirect('/managebooks');

});


module.exports = managedata0Router;