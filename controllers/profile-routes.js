const router = require('express').Router();
const {User, Department, Absence} = require('../models');



router.get('/:id', (req,res) => {
    User.findOne({
        where:{
            id:req.params.id
        },
        attributes:{exclude:['password']},
        include:[
            {
                model:User,
                as:'approver',
                attributes:['id', 'first_name', 'last_name']
            },
            {
                model:User,
                as:'employees',
                attributes:['id','first_name','last_name'],
                include:{
                    model:Absence,
                    attributes:['id','start_date','end_date','absence_hours','leave_type_id','status','created_at','updated_at'],
                }
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No user found with given id'});
            return;
        }
        else{
            res.render(dbUserData)
        }
    })








})