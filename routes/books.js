var express = require('express');
const booksRouter = express.Router();
var con=require('../database');

booksRouter.get('/books', function(req, res, next) {
   
    var sql="SELECT * FROM Books ORDER BY book_id ASC";
        con.query(sql, function (err, data, fields) {
        if (err) throw err;
            var obj = {};
            
            obj = {print: data};
            res.render('Books.ejs', obj);

        // res.render('Books.ejs', { title: 'Books', datasent_id: data.book_id});
        //res.render('Books.ejs', { title: 'Books', datasent: name});
  });

    console.log("router for books imported");

});


// //------------fetch books data in tabular form-------------------
// booksRouter.get('/books', function(request, response){
//     // console.log('GET request received at /') 
//     con.query("SELECT * FROM Books ORDER BY book_id ASC", function (err, result) {
//         if (err) throw err; 
//         else{


//             // console.log(result[0][0]);

//              response.write('<table><tr>');

//             for(var column in result[0]){
//                 response.write('<td><label>'+column+'</label></td>');
                
//             }
//             response.write('</tr>');
//             for(var row in result){
//                 response.write('<tr>');
//                 for(var column2 in result[row]){
//                      response.write('<td><label>'+result[row][column2]+'</label></td>');
//                  }
//                  response.end('</tr>');
//              } 

//             response.write('</table>');
//             console.log("Data fetched");



//         }

//     });
    
// });


module.exports = booksRouter;

