var express = require('express');
const managebooksRouter = express.Router();
var con=require('../database');

managebooksRouter.get('/managebooks', function(req, res, next) {
   
    var sql="SELECT * FROM Books_Status WHERE Status='Request' ORDER BY Request_ID ASC";
        con.query(sql, function (err, data, fields) {
        if (err) throw err;
            var obj = {};
            
            obj = {print: data};
            res.render('managebooks.ejs', obj);
  });

console.log("Printing Manage books Data");
    
});

module.exports = managebooksRouter;

