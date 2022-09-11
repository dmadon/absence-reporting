const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Absence, Leave, Department} = require('../models');


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
        // const user_id = req.session.user_id;
        // const username = req.session.username;
        // const is_approver = req.session.is_approver;
        // const loggedIn = req.session.loggedIn;
        res.render('dashboard',{
            absence, 
            user_id:req.session.user_id,
            loggedIn:req.session.loggedIn,
            username:req.session.username,
            is_approver:req.session.is_approver
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



// NEW ABSENCE VIEW WHERE USERS CAN CREATE A NEW ABSENCE
router.get('/new-absence',withAuth, async (req,res) => {

    const leave_options = await
            Leave.findAll({
                order:['id']
            })
            .then(leaveData => {
                const types = leaveData.map(type => type.get({plain:true}));
                return types
            })

    const approver_email = await
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
                        attributes:['id','first_name','last_name','email']
                    },
                    {
                        model:User,
                        as:'employees',
                        attributes:['id','first_name','last_name','email'],
                        include:{
                            model:Absence,
                            attributes:['id','start_date','end_date','absence_hours','leave_type_id','status','created_at','updated_at'],
                        }
                    }
                ]
            })
            .then(userRecord => {
                const record = userRecord.get({plain:true});
                return record.approver.email
            })
   
    res.render('new-absence',{
        leave_options,
        approver_email,
        user_id:req.session.user_id,
        loggedIn:req.session.loggedIn,
        username:req.session.username,
        is_approver:req.session.is_approver})
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

        res.render('edit-absence',{
            leave_options,
            absence,
            user_id:req.session.user_id,
            loggedIn:req.session.loggedIn,
            username:req.session.username,
            is_approver:req.session.is_approver})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });    
});

module.exports = router;