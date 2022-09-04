const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Absence, Leave} = require('../models');
const sequelize = require('../config/connection');

// THESE ARE THE '/dashboard' ROUTES:

// DISPLAY ALL ABSENCES FOR THE LOGGED IN USER
router.get('/',withAuth,(req,res) => {
    Absence.findAll({
        attributes:['id','start_date','end_date','absence_hours','leave_type_id','status','user_id','created_at','updated_at'],
        where:{
            user_id: req.session.user_id,
            
        },
        order:['start_date'],
       
        include:[
            {
                model:Leave
            },
            {
                model:User,
                include:{
                    model:User,
                    as:'approver',
                    attributes:['id','first_name','last_name','email']
                }
            }
        ]
    })
    .then(dbAbsenceData => {
        const absence = dbAbsenceData.map(absence => absence.get({plain:true}));
        const user_id = req.session.user_id;
        const username = req.session.username;
        const is_approver = req.session.is_approver;
        res.render('dashboard',{dbAbsenceData,absence, user_id, is_approver, username,loggedIn:true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



// NEW ABSENCE VIEW WHERE USERS CAN CREATE A NEW ABSENCE
router.get('/new-absence',withAuth,(req,res) => {
   
    res.render('new-absence',{
        user_id:req.session.user_id,
        loggedIn:req.session.loggedIn,
        username:req.session.username})
});

// EDIT ABSENCE VIEW WHERE USERS CAN EDIT AN EXISTING ABSENCE
router.get('/edit-absence/:id',withAuth,(req,res) => {
    Absence.findOne({
        where:{
            id:req.params.id
        },
        attributes:['id','start_date','end_date','absence_hours','leave_type_id','status','user_id','created_at','updated_at'],
        include:[
            {
                model:Leave
            },
            {
                model:User,
                include:{
                    model:User,
                    as:'approver',
                    attributes:['id','first_name','last_name','email']
                }
            }
        ]
    })
    .then(async dbAbsenceData => {
        if(!dbAbsenceData){
            res.status(404).json({message:"No absence was found with that id."});
            return;
        }

        const absence = dbAbsenceData.get({plain:true});

        const leave_options = await
            Leave.findAll({
                order:['id']
            })
            .then(leaveData => {
                const types = leaveData.map(type => type.get({plain:true}));
                return types
            })
        console.log(leave_options)
        res.render('edit-absence',{
            leave_options,
            absence,
            user_id:req.session.user_id,
            loggedIn:req.session.loggedIn,
            username:req.session.username})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });    
});















module.exports = router;