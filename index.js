//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_nodejs'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

//route for homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM customer_bank";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('Customer_view',{
      results: results
    });
  });
});

//route for insert data
app.post('/save',(req, res) => {
  let data = {nama: req.body.nama, alamat: req.body.alamat, kode_pos: req.body.kode_pos, no_hp: req.body.no_hp, email: req.body.email};
  let sql = "INSERT INTO customer_bank SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE customer_bank SET nama='"+req.body.nama+"', alamat='"+req.body.alamat+"', kode_pos='"+req.body.kode_pos+"', no_hp='"+req.body.no_hp+"', email='"+req.body.email+"' WHERE customer_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM customer_bank WHERE customer_id="+req.body.customer_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
