const db = require("../config/conn.js");
const to = require("../utils/to.js");
const response = require("../utils/response.js");

let exp ={};

exp.quiz = async(req,res) => {
	
	//need to retrieve login id or registeration number of the user
	//cant store just random answers...wont make any sense

	var values = [req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10,req.body.essay1,req.body.essay2,req.body.essay3];

	let err,result;
	[err,result] = await to(db.query('insert into result(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,essay1,essay2,essay3 values ?)',[values]))
	if(err)
	{
		console.log("query runn problem");
		res.sendError(err);
	}

	//redirect to thank you page for completion of exam
	return res.sendSuccess("value inserted",result);
}	

module.exports = exp;
