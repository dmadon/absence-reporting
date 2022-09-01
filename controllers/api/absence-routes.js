const router = require('express').Router();
const {User, Absence} = require('../../models');

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
router.post('/',(req,res) => {
    Absence.create({
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        absence_hours:req.body.absence_hours,
        leave_type_id:req.body.leave_type_id,
        status:req.body.status,
        // ----------------USE THE USER_ID FROM THE SESSION ONCE THE USER IS LOGGED IN
        user_id:req.body.user_id
    })
    .then(dbAbsenceData => res.json(dbAbsenceData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})







module.exports = router;