const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const mysql = require("mysql")
const connect = require("./db")
const connectDB = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"afrifanom"
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static('frontend'))

app.get('/customerform',function(req,res) {
    res.send(`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<div class="container">
			<h1 class="text-center mt-3 mb-3">Submit Form Data in Node.js</h1>
			<div class="card">
				<div class="card-header">Sample Form</div>
				<div class="card-body">
					<form method="POST" action="/customerform">
						<div class="mb-3">
							<label>Name</label>
							<input type="text" name="name" id="name" class="form-control" />
						</div>
						<div class="mb-3">
							<label>Marital Status</label>
							<input type="text" name="maritalstatus" id="maritalstatus" class="form-control" />
						</div>
						<div class="mb-3">
		                	<label>Employment Status</label>
		                	<input type="text" name="employment" id="employment" class="form-control" />
		                </div>
                        <div class="mb-3">
		                	<label>Name of Employer</label>
		                	<input type="text" name="employer" id="employmer" class="form-control" />
		                </div>
                        <div class="mb-3">
		                	<label>Date of Birth</label>
		                	<input type="date" name="dateofbirth" id="dateofbirth" class="form-control" />
		                </div>
                        <div class="mb-3">
		                	<label>ID Card Type</label>
		                	<input type="text" name="cardtype" id="cardtype" class="form-control" />
		                </div>
                        <div class="mb-3">
		                	<label>Address</label>
		                	<input type="text" name="address" id="address" class="form-control" />
		                </div>
                        <div class="mb-3">
		                	<label>Phone Number</label>
		                	<input type="number" name="phone" id="phone" class="form-control" />
		                </div>
		                <div class="mb-3">
		                	<input type="submit" name="submit_button" class="btn btn-primary" value="Add" />
		                </div>
					</form>
				</div>
			</div>
		</div>
    `
    )
})

app.post('/customerform', function(req, res) {
    var names = req.body.name
    var marital_status = req.body.maritalstatus
    var employment_status = req.body.employment
    var name_Of_Employer = req.body.employer
    var date_Of_Birth = req.body.dateofbirth
    var id_type = req.body.cardtype
    var phone = req.body.phone

    var sql = `insert into customerInfo(phoneNumber,names,marital_status,employment_status,name_of_employer,date_of_birth,id_type,address) values("${phone}","${names}","${marital_status}","${employment_status}","${name_Of_Employer}","${date_Of_Birth}","${id_type}",NOW())`

    connectDB.query(sql, function(err) {
        if (err) throw err
        console.log("Table has been updated")
        res.send('table has been updated')
    })
})






app.listen(port,()=>{
    connect
    console.log("Functioning well")
})

module.exports = app