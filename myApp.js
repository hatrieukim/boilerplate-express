var express = require('express');
var app = express();
const dotenv = require('dotenv');
dotenv.config();
const {logger} = require('./mylogger');
const bodyParser = require('body-parser');


// --> 7)  Mount the Logger middleware here
app.use(logger); // middleware function take 3 params: req, res, next

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World")

/** 2) A first working Express Server */


/** 3) Serve an HTML file */
app.get('/hereComeHtml', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"))

/** 5) serve JSON on a specific route */
app.get('/json', (req, res) => {
    let myMessage = 'hello from bun hehe';
    if(process.env.MESSAGE_STYLE == 'uppercase') myMessage = myMessage.toUpperCase();

    res.json({'message': myMessage})
})

/** 6) Use the .env file to configure the app */
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */
app.get('/middleTime', function(req,res, next) {
    req.MyTime = Date().toString();
    next();
}, function(req, res) {
    res.json({'message': req.MyTime})
}) 

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({'word' : word});
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name', (req, res) => {
    let firstname = req.query.first;
    let lastname = req.query.last;

    res.send('ok so you are ' + firstname.toUpperCase() + ' ' + lastname.toUpperCase() + ' hehe');
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post('/name', (req, res) => {
    let t1 = req.body.first;
    let t2 = req.body.last;

    let {first,last} = req.body;
    res.send('you again? ' + t1 + ' ' + t2 + ' and another one' + first + last);
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
