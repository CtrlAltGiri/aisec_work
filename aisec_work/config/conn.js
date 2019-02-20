var mysql = require("mysql");
var config = require('config');

const db = mysql.createConnection({
    host: config.get('DATABASE.host'),
    user: config.get('DATABASE.user'),
    password: config.get('DATABASE.pass'),
    database: config.get('DATABASE.dbname')
});


db.connect((err)=>{
    if(err){
        console.log(err.toString());
        //throw err;
    }
    console.log("connected");
});

module.exports = db;