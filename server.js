const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT||3001;
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
    secret:'SuperTopSecret',
    cookie:{},
    resave:false,
    saveUninitialized:true,
    store: new SequelizeStore({db:sequelize})
};

app.use(session(sess));

app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

// turn on routes
app.use(routes);


// turn on connection to database server
sequelize.sync({force: false})
    .then(() => {
        app.listen(PORT,() => console.log(`Now listening on port ${PORT}`));
    });

    


// var http = require("http");
// var nodemailer = require("nodemailer");

// var server = http.Server(app)
// // var port2 = 500;



// app.set("port", PORT);
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname, "static")));

// // //Routing
// app.get("/", function(req, response) {
//     response.sendFile(path.join(__dirname, "static/index.html"))
// })

// app.post("/send_email", function(req,response) {
//     var from = req.body.from;
//     var to = req.body.to;
//     var subject = req.body.subject;
//     var message = req.body.message;

//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'robertschris010@gmail.com',
//             pass: 'vmzwlraqmtrxbcfk'
//         }
//     });

//     var mailOptions = {
//         from: from,
//         to: to,
//         subject: subject,
//         text: message
//     };

//     transporter.sendMail(mailOptions, function(err, info) {
//         if (error) {
//             console.log(error)
//         }else {
//             console.log("Email Sent: " + info.response)
//         }
//         response.redirect("/")
//     })
// })


// // Initialize web server
// server.listen(port2, function() {
//     console.log("starting server on port " + port2)
// })
// console.clear()
