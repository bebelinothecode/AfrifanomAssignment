const mysql = require("mysql")
const express = require('express')
const app = express()
const connectDB = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"afrifanom"
});

connectDB.connect(function(err) {
    if (err) throw err;
    console.log("connected to database")
});

const sql = `create table if not exists customerInfo(
    phoneNumber int primary key,
    names varchar(100) not null,
    marital_status varchar(100) not null,
    employment_status varchar(100) not null,
    name_Of_Employer varchar(100) not null,
    date_Of_Birth date not null,
    id_type varchar(100) not null,
    address varchar(100) not null
)`;

connectDB.query(sql, function(err,result) {
    if (err) {
        console.log(`Failed to connect to database ${err}`)
    }
    else{
        console.log("Table created")
    }
});

app.post('/customerform', function(req, res, next) {
    var names = req.body.name
    var marital_status = req.body.marital
    var employment_status = req.body.employment
    var name_Of_Employer = req.body.employer
    var date_Of_Birth = req.body.dateofbirth
    var id_type = req.body.idtype
    var phone = req.body.phone

    var sql = `insert into customerInfo(phoneNumber,names,marital_status,employment_status,name_of_employer,date_of_birth,id_type,address) values("${phone}","${names}","${marital_status}","${employment_status}","${name_Of_Employer}","${date_Of_Birth}","${id_type}",NOW())`

    connectDB.query(sql, function(err, result) {
        if (err) throw err
        console.log("Table has been updated")
        req.flash('success', 'Data Stored')
        res.redirect('/')
    })
})


module.exports = connectDB



