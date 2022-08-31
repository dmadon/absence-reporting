const router = require('express').Router();

const userRoutes = require('./user-routes');
// const absenceRoutes = require('./absence-routes');

router.use('/users',userRoutes);
// router.use('/absences',absenceRoutes);

module.exports = router;