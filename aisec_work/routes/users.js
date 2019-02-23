const response = require("../utils/response.js");
const to = require("../utils/to.js");
const db = require("../config/conn.js");
const moment = require("moment");
const bcrypt = require("bcryptjs");


let exp = {};

//hashing left and redirection left
exp.StudentLogin = async (req, res) => {
	//need to use salt and hash
	let uname, upass, qry, err, result;
	uname = req.body.uname;
	pass = req.body.pass;
	
	//according to actual time utc = current time - 5:30
	// if(moment().isBefore('2019-02-25T12:30:00Z'))
	// {   
	// 	console.log(moment());
	// 	console.log("not yet time");
	// 	// res.sendError("not yet");
	// 	res.redirect("/wait.html");
	// }

	console.log(uname,pass);
	if (uname && pass) {
		
		qry = "select * from user where uname =? and login =0";
		[err,result] = await to(db.query(qry,[uname]));

		if(err || !result[0])
		{
			console.log(err);
			console.log(result[0]);
			res.redirect("/login.html");
			return res.sendError(err);
		}


		let encrypt = result[0]['pass'];

		if(!bcrypt.compare(encrypt,pass))
		{
			console.log("wrong details");
			res.redirect("/login.html");
			return res.sendError(err);
		}

		qry = "update user set login = 1 where uname = ? and login = 0"; //logged in..cant login later
		[err, result] = await to(db.query(qry, [uname]));
		if (err) {
			console.log(err);
			res.redirect("/login.html");
			return res.sendError(err);
		}

		qry = "select * from user where uname = ?";
		[err,result] = await to(db.query(qry,[uname]));

		if(err)
		{
			console.log(err);
			res.redirect("/login.html");
			return res.sendError(err);
		}

		req.session.id = result[0]['id'];
		req.session.reg = result[0]['reg_no'];
		
		res.redirect("/aiesec.html");
		return res.sendSuccess(req.session.id, "Login Successfull");
		
	} else {
		res.redirect("/login.html");
		return res.sendError("no values inserted in uname and pass");

	}
};

exp.AdminLogin = async (req, res) => {
	let uname, pass, qry, result;

	uname = req.body.uname;
	pass = req.body.pass;

	
	if(uname && pass)
	{

		qry = "select * from admin where uname =?";
		[err,result] = await to(db.query(qry,[uname]));
		if(err || !result[0])
		{
			console.log(err);
			res.redirect("/adminlogin.html");
			return res.sendError(err);
		}

		let encrypt = result[0]['pass'];


		if(!bcrypt.compare(encrypt,pass))
		{
			console.log("wrong details");
			return res.sendError(err);
		}

		console.log("correction");

		res.redirect("/register.html");
		return res.sendSuccess("yahoo",result[0]);
		
	}
	else
	{
		console.log("no entry available in uname and pass");
		return res.sendError("no value");
	}
};

exp.registration = async (req, res) => {
	let uname, clg, pass, reg, email, name, time_slot, phno, qry, reult, err;

	uname = req.body.uname;
	clg = req.body.clg;
	pass = req.body.pass;
	reg = req.body.registration;
	email = req.body.email;
	name = req.body.name;
	time_slot = req.body.time_slot;
	phno = req.body.phno;


	if (uname && clg && pass && reg && email && name && time_slot && phno) {

		[err,pass1] = await to(bcrypt.hash(pass,10));
		if(err)
		{
			console.log(err)
			res.redirect("/register.html");
			return res.sendError(err);

		}
		pass = pass1;
		console.log(pass);

		//enter into register
		qry =
			"insert into user(uname,clg,pass,reg_no,email,name,time_slot,phno) values(?,?,?,?,?,?,?,?)";
		[err, result] = await to(
			db.query(qry, [uname, clg, pass, reg, email, name, time_slot, phno])
		);
		if (err) {
			console.log(err);
			res.redirect("/register.html");
			return res.sendError(err);
		}

		console.log("values inserted(registeration)");
		res.redirect("/thankyou.html");
		return res.sendSuccess(uname, "registered Successfully");
	} else {
		console.log("enter all details");
		res.redirect("/register.html");
		return res.sendError("enter all details");
	}
};

module.exports = exp;
