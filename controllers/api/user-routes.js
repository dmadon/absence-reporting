const router = require('express').Router();
const {User, Department} = require('../../models');

// THESE ARE THE '/api/users' ROUTES:

// GET ALL USERS
router.get('/',(req,res) => {
    User.findAll({
        include:[
            {
                model:User,
                as:'supervisor',
                attributes:['first_name','last_name']
            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// CREATE NEW USER
router.post('/',(req,res) => {
    User.create({
       first_name: req.body.first_name,
       last_name:req.body.last_name,
       is_approver:req.body.is_approver,
       department_id:req.body.department_id,
       approver_id:req.body.approver_id,
       email:req.body.email,
       password:req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.first_name = dbUserData.first_name;
            req.session.last_name = dbUserData.last_name;
            req.session.is_approver = dbUserData.is_approver;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;