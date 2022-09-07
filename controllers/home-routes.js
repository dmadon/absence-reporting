const router = require('express').Router();
const {User} = require('../models');

// THESE ARE THE '/' ROUTES:

router.get('/', async (req,res) => {

    const approver_options = await
        User.findAll({
            where:{
                is_approver:true
            },
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