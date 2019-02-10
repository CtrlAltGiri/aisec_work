const db = require("../config/conn.js");
let exp = {};

/* GET users listing. */
router.get("/", function(req, res, next) {
	res.send("respond with a resource");
});

exp.login = async (res, req) => {
	//not putting anyu facilities in the code
	//prett straight-forward
	//need to use salt and hash
	let uname, upass, qry, err, result;
	uname = req.body.uname;
	pass = req.body.pass;
	if (uname && pass) {
		qry = "select count(*) from login where uname = ? and pass = ?";
		[err, result] = await to(db.query(qry, [uname, pass]));
		if (err) {
			console.log("could not retrieve the result");
			return res.sendError(err);
		}

		let count = result[0];
		if (count == 0) {
			console.log("wrong details");
			return res.sendError("not found");
		} else if (count == 1) {
			qry = "update login set status = 1";
			[err, result] = await to(db.query(qry));
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

exp.registeration = async (res,req) => {
	let uname, clg, pass, reg, email, name, time_slot, phno qry, reult, err;
	uname = req.body.uname;
	clg = req.body.clg;
	pass = req.body.pass;
	reg = req.body.registeration;
	
	if(uname && clg && pass && reg)
	{

	}
	else
	{
		console.log("enter all details");
		return res.sendError("enter all details");
	}


}