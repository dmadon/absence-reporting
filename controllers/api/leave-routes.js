const router = require('express').Router();
const {Leave} = require('../../models');
const withAuth = require('../../utils/auth');


// THESE ARE THE '/api/leave' ROUTES:

// GET ALL LEAVE TYPES
router.get('/',withAuth,(req,res) => {
    Leave.findAll()
    .then(dbLeaveData => res.json(dbLeaveData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET SINGLE LEAVE TYPE BY ID
router.get('/:id',withAuth, (req,res) => {
    Leave.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(dbLeaveData => {
        if(!dbLeaveData){
            res.status(404).json({message:"No leave type was found with that id."});
            return;
        }
        res.json(dbLeaveData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE NEW LEAVE TYPE
router.post('/',withAuth,(req,res) => {
    Leave.create({
        leave_type:req.body.leave_type
    })
    .then(dbLeaveData => res.json(dbLeaveData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE A LEAVE TYPE
router.put('/:id',withAuth, (req,res) => {
    Leave.update(req.body,{
        where:{
            id:req.params.id
        },
        individualHooks:true
    })
    .then(dbLeaveData => {
        if(!dbLeaveData){
            res.status(404).json({message:"No leave type found with that id."});
            return;
        }
        res.json(dbLeaveData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE A LEAVE TYPE
router.delete('/:id',withAuth, (req,res) => {
    Leave.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(dbLeaveData => {
        if(!dbLeaveData){
            res.status(404).json({message:"No leave type found with that id."});
            return;
        }
        res.json(dbLeaveData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;