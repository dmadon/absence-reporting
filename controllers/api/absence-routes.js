const router = require('express').Router();
const {User, Absence} = require('../../models');
const withAuth = require('../../utils/auth');


// THESE ARE THE '/api/absences' ROUTES:


// GET ALL ABSENCES
router.get('/',(req,res) => {
    Absence.findAll({
        include:[
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
    .then(dbAbsenceData => res.json(dbAbsenceData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// CREATE A NEW ABSENCE
router.post('/',withAuth,(req,res) => {
    Absence.create({
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        absence_hours:req.body.absence_hours,
        leave_type_id:req.body.leave_type_id,
        status:req.body.status,
        // ----------------USE THE USER_ID FROM THE SESSION ONCE THE USER IS LOGGED IN
        user_id:req.session.user_id
    })
    .then(dbAbsenceData => res.json(dbAbsenceData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE AN ABSENCE
router.put('/:id',withAuth,(req,res) => {
    Absence.update(req.body,{
        where:{
            id: req.params.id,
        },
        individualHooks:true
    })
    .then(dbAbsenceData => {
        if(!dbAbsenceData){
            res.status(404).json({message:'No absence found with that id.'});
            return;
        }
        res.json(dbAbsenceData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE AN ABSENCE
router.delete('/:id',withAuth,(req,res) => {
    Absence.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(dbAbsenceData => {
        if(!dbAbsenceData){
            res.status(404).json({message:'No absence was found with that id.'});
            return;
        }
        res.json(dbAbsenceData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// APPROVE AN ABSENCE
router.put('/approve/:id',)





module.exports = router; 