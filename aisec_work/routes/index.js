const router =  require("express").Router();

const users = require("./users.js");
const paper = require("./quiz.js");

router.post('/login.html',users.StudentLogin);

router.post('/AdminLogin',users.AdminLogin);

router.post('/register.html',users.registration);

router.post('/route_here',paper.quiz);

module.exports = router;