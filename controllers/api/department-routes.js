const router = require('express').Router();
const {User,Absence,Leave, Department} = require('../../models');
const withAuth = require('../../utils/auth');

// THESE ARE THE '/api/department' ROUTES:

// GET ALL DEPARTMENTS
router.get('/',withAuth,(req,res) =>{
    Department.findAll({
        include:[
            {
                model:User,
                attributes:{exclude:['password']}
            }
        ]
    })
    .then(dbDepartmentData => res.json(dbDepartmentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// GET A SINGLE DEPARTMENT BY ID
router.get('/:id',withAuth,(req,res) => {
    Department.findOne({
        where:{
            id:req.params.id
        },
        include:[
            {
                model:User,
                attributes:{exclude:['password']}
            }
        ]
    })
    .then(dbDepartmentData => {
        if(!dbDepartmentData){
            res.status(404).json({message:'No department was found with that id.'});
            return;
        }
        res.json(dbDepartmentData);        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


// CREATE A DEPARTMENT
router.post('/',withAuth,(req,res) => {
    Department.create({
        name:req.body.name
    })
    .then(dbDepartmentData => res.json(dbDepartmentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// UPDATE A DEPARTMENT'S NAME
router.put('/:id',withAuth,(req,res) => {
    Department.update(req.body,{
        where:{
            id:req.params.id,
        },
        individualHooks:true        
    })
    .then(dbDepartmentData => {
        if(!dbDepartmentData){
            res.status(404).json({message:'No department was found with that id.'});
            return;
        }
        res.json(dbDepartmentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// DELETE A DEPARTMENT
router.delete('/:id',withAuth,(req,res) => {
    Department.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(dbDepartmentData => {
        if(!dbDepartmentData){
            res.status(404).json({message:'No department was found with that id.'});
            return;
        }
        res.json(dbDepartmentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;