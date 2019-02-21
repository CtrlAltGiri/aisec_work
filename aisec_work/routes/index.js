const router =  require("express").Router();

const users = require("./users.js");
const paper = require("./quiz.js");

router.post('/StudentLogin',users.StudentLogin);

router.post('/AdminLogin',users.AdminLogin);

router.post('/registration',users.registration);

router.post('/quiz',paper.quiz);

module.exports = router;