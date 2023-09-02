// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config();

// create connection to the database, pass in your MySQL information for username and password
let sequelize;

// sequelize = new Sequelize('mysql://r2sfnc9vkjx8h1d8:rkl6e7gg7t1j7v4x@jbb8y3dri1ywovy2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/eshkea2pvf6an83o')

if(process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else{
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
        host:'localhost',
        dialect:'mysql',
        port:3306
    });
};

module.exports = sequelize;