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
require('dotenv').config();


const sess = {
    secret:process.env.SESS_SECRET,
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

    

