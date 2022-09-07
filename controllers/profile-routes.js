const router = require('express').Router();
const {User, Department, Absence} = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// THESE ARE THE '/profile' ROUTES:

const today = new Date();

// GET THE LOGGED-IN EMPLOYEE'S PROFILE INFO:

router.get('/', withAuth,(req,res) => {
    User.findOne({
        where:{
            id:req.session.user_id
        },
        attributes:{exclude:['password']},
        include:[
            {
                model:Department,
                attributes:['id','name']
            },
            {
                model:User,
                as:'approver',
                attributes:['id', 'first_name', 'last_name']
            },
            {
                model:User,
                as:'employees',
                attributes:['id','first_name','last_name',
                    [sequelize.literal(`(SELECT COUNT(*) FROM absence WHERE absence.user_id = employees.id)`),'total_absences'],
                    [sequelize.literal(`(SELECT COUNT(*) FROM absence WHERE absence.user_id = employees.id AND absence.end_date > CURRENT_DATE AND absence.status = 'Approved')`),'upcoming_absences']],
                include:[
                    {
                    model:Absence,
                    attributes:['id','start_date','end_date','absence_hours','leave_type_id','status','created_at','updated_at'],
                    },
                    {model:Department,
                    attributes:['id','name']
                    }
                ]
            }
        ],
        order:[['employees','last_name','ASC']]
    })
    .then(dbUserData => {
        const profile = dbUserData.get({plain:true});
        const employees = dbUserData.employees.map(employee => employee.get({plain:true}))
        // const sort = employees.sort(function(a,b){let x=a.last_name.toLowerCase();let y=b.last_name.toLowerCase();if(x<y){return-1;}if(x>y){return 1;}return 0;})
        const user_id = req.session.user_id;
        const username = req.session.username;
        const is_approver = req.session.is_approver;
        const loggedIn = req.session.loggedIn;
        res.render('profile', {profile,employees,user_id,username,is_approver,loggedIn})     

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;