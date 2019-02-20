const response = require("../utils/response.js");
const to = require("../utils/to.js");

let exp = {};

//hashing left and redirection left
exp.StudentLogin = async (req, res) => {
	//not putting anyu facilities in the code
	//prett straight-forward
	//need to use salt and hash
	let uname, upass, qry, err, result;
	uname = req.body.uname;
	pass = req.body.pass;
	if (uname && pass) {
		qry = "select count(*) from login where uname = ? and pass = ? and status = 0";
		[err, result] = await to(db.query(qry, [uname, pass]));
		if (err) {
			console.log("could not retrieve the result");
			return res.sendError(err);
		}

		let count = result[0];
		if (count !=1 ) {
			console.log("wrong details");
			return res.sendError("not found");
		} else if (count == 1) {
			qry = "update login set status = 1 where uname = ? and pass = ?"; //logged in..cant login later
			[err, result] = await to(db.query(qry, [uname, pass]));
			if (err) {
				console.log(err);
				return res.sendError(err);
			}

			//redirect to question paper page
			return res.sendSuccess(count,"Login Successfull" );
		}
	} else {
		return res.sendError("no values inserted");
	}
};

//hashing and sending to new page left
exp.AdminLogin = async (req,res) => {

	let uname,pass,qry,result;
	
	uname = req.body.uname;
	pass = req.body.pass;
	//hashing left


	qry = "select count(*) from admin where uname =? and pass =?";
	[err,result] = await to(db.query(qry,[uname,pass]));
	
	if(err)
	{
		console.log("error while running query");
		return res.sendError(err);
	}
	
	let count = result[0];
	if(count == 1)
	{
		//redirect to results page
		return res.sendSuccess("log in Successfull",count);
	}

	console.log("wrong username or password");
	return res.sendError(err)
};

exp.registeration = async (req,res) => {
	
	let uname, clg, pass, reg, email, name, time_slot, phno,qry, reult, err;
	
	uname = req.body.uname;
	clg = req.body.clg;
	pass = req.body.pass;
	reg = req.body.registeration;
	email = req.body.email;
	name = req.body.name;
	time_slot = req.body.time_slot;
	phno = req.body.phno;	

	//need to add salt and hashing of password
	//need to add re_captcha

	if(uname && clg && pass && reg && email && name && time_slot && phno) {
		//enter into register
		qry = "insert into login(uname,clg,pass,reg,email,name,time_slot values(?,?,?,?,?,?,?))";
		[err,result] = await to(db.query(qry,[uname,clg,pass,reg,email,name,time_slot]));
		if(err)
		{
			console.log(err);
			return res,sendError(err);
		}

		console.log("values inserted(registeration)");
		return res.sendSuccess(uname,"registered Successfully");

	}
	else {
			console.log("enter all details");
			return res.sendError("enter all details");
	}

};

module.exports = exp;
