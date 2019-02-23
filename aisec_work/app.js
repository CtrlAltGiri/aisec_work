const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const bodyParser = require('body-parser');


const config = require('config');

const session = require('express-session');
const passport = require('passport');

const response = require('./utils/response');
const routes = require('./routes');

const app = express();
app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

require('./config/passport')(passport);

app.use(session({secret: config.get('SESSION_SECRET_KEY')}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(response);

app.use('/', routes);


const port = process.env.PORT || 3000;

app.listen(port, err => {
    console.log(err || 'Listening on port ' + port);
});
