const router = require('express').Router();
const {User, Department} = require('../../models');

// THESE ARE THE '/api/users' ROUTES:

router.post('/',(req,res) => {
    User.create({
       first_name: req.body.first_name,
       last_name:req.body.last_name,
       is_sup:req.body.is_sup,
       department_id:req.body.department_id,
       sup_id:req.body.sup_id,
       email:req.body.email,
       password:req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.first_name = dbUserData.first_name;
            req.session.last_name = dbUserData.last_name;
            req.session.is_sup = dbUserData.is_sup;
            req.session.loggedIn = true;

            res.json(dbUserdata);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;