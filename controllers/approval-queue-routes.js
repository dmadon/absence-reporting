const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User,Absence,Leave} = require('../models');

// THESE ARE THE '/approval-queue' ROUTES:

router.get('/',withAuth,(req,res) => {
    Absence.findAll({
        attributes:['id','start_date','end_date','absence_hours','leave_type_id','status','created_at','updated_at','user_id'],
        where:{
            status:'Pending'
        },
        order:['updated_at'],
        include:[
            {
                model:Leave,
                attributes:['leave_type']
            },
            {
                model:User,
                where:{
                    approver_id:req.session.user_id
                },
                attributes:{exclude:['password']},
            }
        ]
    })
    .then(dbAbsenceData => {
        const absence = dbAbsenceData.map(absence => absence.get({plain:true}));
        const user_id = req.session.user_id;
        const username = req.session.username;
        const is_approver = req.session.is_approver;
        res.render('approval-queue',{absence,user_id,username,is_approver,loggedIn:true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;