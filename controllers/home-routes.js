const router = require('express').Router();
const {User, Department} = require('../models');

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

    const department_options = await
        Department.findAll({
            order:['name']
        })
        .then(departmentData => {
            const departments = departmentData.map(department => department.get({plain:true}));
            return departments;
        })

    res.render('login',{
        approver_options,
        department_options
    });
});








module.exports = router;