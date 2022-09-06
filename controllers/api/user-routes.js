const router = require('express').Router();
const {User, Department, Absence} = require('../../models');

// THESE ARE THE '/api/users' ROUTES:

// GET ALL USERS
router.get('/',(req,res) => {
    User.findAll({
        attributes:{exclude:['password']},
        include:[
            {
                model:Department
            },
            {
                model:User,
                as:'approver',
                attributes:['id','first_name','last_name'],
                include:{
                    model:Department
                }
            },
            {
                model:User,
                as:'employees',
                attributes:['id','first_name','last_name'],
                include:[
                    {
                        model:Department
                    },
                    {
                        model:Absence,
                        attributes:['id','start_date','end_date','absence_hours','leave_type_id','status','created_at','updated_at'],
                    }                    
                ]
            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET A SINGLE USER BY ID
router.get('/:id',(req,res) => {
    User.findOne({
        where:{
            id:req.params.id
        },
        attributes:{exclude:['password']},
        include:[
            {
                model:User,
                as:'approver',
                attributes:['id','first_name','last_name']
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
            res.status(404).json({message:'Sorry, no user was found with that id.'});
            return;
        }
        else{
            res.json(dbUserData)
        }   
    })        
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// CREATE NEW USER
router.post('/',(req,res) => {
    User.create({
       first_name: req.body.first_name,
       last_name:req.body.last_name,
       is_approver:req.body.is_approver,
       is_admin:req.body.is_admin,
       department_id:req.body.department_id,
       approver_id:req.body.approver_id,
       email:req.body.email,
       password:req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = `${dbUserData.first_name} ${dbUserData.last_name}`;
            req.session.first_name = dbUserData.first_name;
            req.session.last_name = dbUserData.last_name;
            req.session.is_approver = dbUserData.is_approver;
            req.session.is_admin = dbUserData.is_admin;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE USER INFO
router.put('/:id',(req,res) => {
    User.update(req.body,{
        individualHooks:true,
        
        where:{
            id:req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'Sorry, no user was found with that id.'});
            return;
        }
        else{
            res.json(dbUserData)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// LOGIN AN EXISTING USER
router.post('/login',(req,res) => {
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'Sorry, no user was found with that id.'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({message:'Invalid password.'});
            return;
        }
        else{
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.first_name = dbUserData.first_name;
                req.session.last_name = dbUserData.last_name;
                req.session.username = `${dbUserData.first_name} ${dbUserData.last_name}`;
                req.session.is_approver = dbUserData.is_approver;
                req.session.is_admin = dbUserData.is_admin;
                req.session.loggedIn = true;

                res.json({user:dbUserData,message:'You are logged in!'});
            })
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// LOGOUT A USER
router.post('/logout',(req,res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.json({message:'You have been successfully logged out.'})
            res.status(204).end();
        })
    }
    else{
        res.status(404).end();
    }
});

// DELETE A USER
router.delete('/:id',(req,res) =>{
    User.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message:'Sorry, no user was found with that id.'});
            return;
        }
        else{
            res.json(dbUserData);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;