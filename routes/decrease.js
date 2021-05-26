var express = require('express');
const decreaseRouter = express.Router();
var con=require('../database');

decreaseRouter.post('/decrease', function(req, res, next) {
    
    var localID = req.body.book_id;
    var newcount = 0;
    if(req.body.book_count-1>=0){
        newcount = parseInt(req.body.book_count)-1;
    }
    //console.log(localID);
    console.log(newcount);

    var updateQuery = "UPDATE Books SET book_count= "+newcount+" WHERE book_id = "+localID+"";
    con.query(updateQuery, function (err, result) {     
    if (err) throw err;  
    });  
    
    console.log("DECREMENTED");
    res.redirect('/admin');

});

module.exports = decreaseRouter;

