const express = require('express');
const session = require('express-session');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}));

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234RTyu$',
    database:'USERS'
});

con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });


app.get('/', (req,res)=>{
    res.render('index.ejs',{user:'Sai'});
})



app.get('/library', (req,res)=>{
    res.render('library.ejs');
})

app.get('/admin', (req,res)=>{
    res.render('admin.ejs');
})


app.get('/login',(req,res)=>{
   res.render('login.ejs')
})

app.post('/login', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    // const hashedPassword =await bcrypt.hash(req.body.password,10); 
    // const password = hashedPassword;
    var sql = "SELECT * FROM USERS_DATA WHERE Email='"+email+"'";
    //console.log(sql);
    con.query(sql, (error, result, fields) => {
        if (error) {
          return console.error(error.message);
        }

        if(result.length>0){

        Object.keys(result).forEach(function(key) {

            
            
            var row = result[key];
            
            if(bcrypt.compareSync(password, row.Password)){
                
                // if((row.Name==="Admin")){
                    
                //     res.redirect('/admin');
                // }
                // else{
                    console.log("Hlllow");
                    res.redirect('/library');
                //}
                //console.log("Correct PW");
                // NOW LOGIN INTO HIS RESPECTIVE PAGE
            }
            else{
                
                res.status("400");
                res.send("Incorrect Password !");

                // console.log("Wrong PW");
                
            }
        
    
        
          });
        }

        else{res.send("Email doesnt exist");}
    });
})



app.get('/register', (req,res)=>{
    res.render('register.ejs');
})

app.post('/register',async(req,res)=>{
    try {
        const hashedPassword =await bcrypt.hash(req.body.password,10);  
        const password = hashedPassword;

        // const password = req.body.password;

        const name = req.body.name;
        const email = req.body.email;
        
        if(name && email && password){
            var sql = "INSERT INTO USERS_DATA (Name,Email,Password) VALUES ('"+name+"', '"+email+"', '"+password+"')";  
            con.query(sql, function (err, result) {     
            if (err) throw err;  
            console.log("USER DATA INSERTED");  
            }); 
            // console.log("Created User! Name: "+name+"Email:" +email+"Password: "+password);
        }
        res.redirect('/login');
    } 
    catch {
        res.redirect('/register');
    }
})

app.listen(3000);