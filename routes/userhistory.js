var express = require('express');
const userhistoryRouter = express.Router();
var con=require('../database');
const session = require('express-session');
var sess;

userhistoryRouter.get('/userhistory', function(req, res, next) {
   //write code to fetch approved books of that email only
   
   sess = req.session;
   var stringEmail = sess.email;
   //console.log(stringEmail);
    var sql="SELECT * FROM Books_Status INNER JOIN Books USING(book_id) WHERE User_Email ='"+stringEmail+"' ORDER BY Request_ID ASC";

    con.query(sql, function (err, data, fields) {
        if (err) throw err;
            var obj = {};

            obj = {print: data};
            res.render('userhistory.ejs', obj);
        // res.render('Books.ejs', { title: 'Books', datasent_id: data.book_id});
        //res.render('Books.ejs', { title: 'Books', datasent: name});
  });

});

module.exports = userhistoryRouter;