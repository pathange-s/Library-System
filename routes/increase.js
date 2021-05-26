var express = require('express');
const increaseRouter = express.Router();
var con=require('../database');

increaseRouter.post('/increase', function(req, res, next) {
    
    var localID = req.body.book_id;
    var newcount = parseInt(req.body.book_count)+1;

    //console.log(localID);
    //console.log(newcount);
    var updateQuery = "UPDATE Books SET book_count= "+newcount+" WHERE book_id = "+localID+"";
    con.query(updateQuery, function (err, result) {     
    if (err) throw err;  
    });  

    console.log("INCREMENTED");
    res.redirect('/admin');

});

module.exports = increaseRouter;

