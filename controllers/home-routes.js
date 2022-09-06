const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Absence} = require('../models');

// THESE ARE THE '/' ROUTES:

router.get('/', async (req,res) => {

    const approver_options = await
        User.findAll({
            order:['last_name']
        })
        .then(approverData => {
            const approvers = approverData.map(approver => approver.get({plain:true}));
            return approvers;
        })

    res.render('login',{
        approver_options
    });
});








module.exports = router;