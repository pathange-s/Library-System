var express = require('express');
const adminRouter = express.Router();
var con=require('../database');
const session = require('express-session');
var sess;


adminRouter.get('/admin', function(req, res, next) {
    
    sess = req.session;
    if(sess.email=='admin@gmail.com') {
        var sql="SELECT * FROM Books ORDER BY book_id ASC";
        con.query(sql, function (err, data, fields) {
        
        if (err) throw err;
            var obj = {};
            
            obj = {print: data};
            res.render('admin.ejs',obj);   
            
        });

        
        
    }
    else{ 
        console.log(sess);
        res.redirect('/login');
     
    }


    //console.log("ADMIN ROUTE IMPORTED");

});


module.exports = adminRouter;

