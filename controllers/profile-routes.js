const router = require('express').Router();
const {User, Department, Absence} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth,(req,res) => {
    User.findOne({
        where:{
            id:req.session.user_id
        },
        attributes:{exclude:['password']},
        include:[
            {
                model:Department
            },
            {
                model:User,
                as:'approver',
                attributes:['id', 'first_name', 'last_name']
            },
            {
                model:User,
                as:'employees',
                attributes:['id','first_name','last_name'],
                order:['last_name'],
                include:{
                    model:Absence,
                    attributes:['id','start_date','end_date','absence_hours','leave_type_id','status','created_at','updated_at'],
                }
                
            }
        ]
    })
    .then(dbUserData => {
        const profile = dbUserData.get({plain:true});
        const employees = dbUserData.employees.map(employee => employee.get({plain:true}))
        const user_id = req.session.user_id;
        const username = req.session.username;
        const is_approver = req.session.is_approver;
        const loggedIn = req.session.loggedIn;
        res.render('profile', {profile,employees,user_id,username,is_approver,loggedIn})     
        // res.json(employees)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;