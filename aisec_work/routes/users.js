const to = require("../utils/to.js");
const db = require("../config/conn.js");
var bcrypt = require("bcryptjs");


let exp = {};



exp.login = async (req, res) => {
	//not putting any facilities in the code
	//prett straight-forward
	//need to use salt and hash

	console.log("hello");

	let uname, ass, qry, err, result;
	uname = req.body.uname;
	pass = req.body.upass;

	console.log(uname,pass);

	
	pass=bcrypt.hash(pass,10);

	if (uname && pass) {
		let qrr = `select * from login where uname=? and pass=? and login=0`;
		let query = db.query(qrr,[uname,pass],(err_q,result)=>{
		if (err_q) {
			console.log("could not retrieve the result");
			return res.sendError(err);
		}
		if (!result) {
			console.log(result);
			console.log("wrong details");
			return res.sendError("not found");
		} else if (result[0]['c'] == 1) {
			qry2 = `update login set status = 1 where uname = ? and pass = ?`; //logged in..cant login later
			let query2 = db.query(qry2,[uname,pass],(err_q,result)=>{
				if (err) {
					console.log("could not retrieve the result");
					return res.sendError(err);
				}
				else{
					console.log("success");
				}
			});

		}
		else{
			console.log("error");
		}
		
	}); 
	}
else {
		return res.sendError("no values inserted");
	}
};

exp.registeration = async (res,req) => {
	
	let uname, clg, pass, reg, email, name, time_slot, phno,qry, reult, err;
	
	uname = req.body.uname;
	clg = req.body.clg;
	pass = req.body.pass;
	reg = req.body.registeration;
	email = req.body.email;
	name = req.body.name;
	time_slot = req.body.time_slot;

	//need to add salt and hashing of password
	//need to add re_captcha

	if(uname && clg && pass && reg && email && name && time_slot) {
		//enter into register
		qry = `insert into login(uname,clg,pass,reg,email,name,time_slot values(?,?,?,?,?,?,?))`;
		[err,result] = await to(db.query(qry,[uname,clg,pass,reg,email,name,time_slot]));
		if(err)
		{
			console.log(err);
			return res,sendError(err);
		}

	}else {
		console.log("enter all details");
		return res.sendError("enter all details");
	}
}

module.exports = exp;