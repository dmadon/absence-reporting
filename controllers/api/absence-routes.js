const router = require('express').Router();
const {User, Absence, Leave} = require('../../models');
const withAuth = require('../../utils/auth');


// THESE ARE THE '/api/absences' ROUTES:


// GET ALL ABSENCES
router.get('/',withAuth,(req,res) => {
    Absence.findAll({
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
    .then(dbAbsenceData => res.json(dbAbsenceData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET SINGLE ABSENCE BY ID
router.get('/:id',withAuth,(req,res) => {
    Absence.findOne({
        where:{
            id:req.params.id
        },
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
        if(!dbAbsenceData){
            res.status(404).json({message:'No absence was found with that id.'});
            return;
        }
        res.json(dbAbsenceData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


// CREATE A NEW ABSENCE
router.post('/',withAuth,(req,res) => {
    Absence.create({
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        absence_hours:req.body.absence_hours,
        leave_type_id:req.body.leave_type_id,
        status:req.body.status,
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
router.put('/approval/:id',withAuth,(req,res) => {
    Absence.findOne({
        where:{
            id:req.params.id
        },
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
    .then(dbAbsenceData => {
        if(!dbAbsenceData){
            res.status(404).json({message:'No absence was found with that id.'});
            return;
        };
        
        const authApprover = dbAbsenceData.checkApproverId(req.session.user_id,dbAbsenceData.user.approver.id);

        if(!authApprover){
            res.json({message:'You are not authorized to approve this absence.'});
            return;            
        }
        else{
            Absence.update(
                {
                    status:'Approved'
                },
                {
                    where:{
                        id: dbAbsenceData.id
                    }
                }
            )
            .then(statusUpdate => res.json(statusUpdate))
        }
    });
});

// DENY AN ABSENCE
router.put('/denial/:id',withAuth,(req,res) => {
    Absence.findOne({
        where:{
            id:req.params.id
        },
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
    .then(dbAbsenceData => {
        if(!dbAbsenceData){
            res.status(404).json({message:'No absence was found with that id.'});
            return;
        };
        
        const authApprover = dbAbsenceData.checkApproverId(req.session.user_id,dbAbsenceData.user.approver.id);

        if(!authApprover){
            res.json({message:'You are not authorized to approve this absence.'});
            return;            
        }
        else{
            Absence.update(
                {
                    status:'Denied'
                },
                {
                    where:{
                        id: dbAbsenceData.id
                    }
                }
            )
            .then(statusUpdate => res.json(statusUpdate))
        }
    });
});


module.exports = router; 