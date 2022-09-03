const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Absence} = require('../models');

// THESE ARE THE '/' ROUTES:

router.get('/', (req,res) => {
    res.render('login');
});








module.exports = router;