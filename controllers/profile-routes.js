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
                
            }
        ]
    })
})