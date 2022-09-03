const router = require('express').Router();

const userRoutes = require('./user-routes');
const absenceRoutes = require('./absence-routes');
const leaveRoutes = require('./leave-routes');

router.use('/users',userRoutes);
router.use('/absences',absenceRoutes);
router.use('/leave',leaveRoutes);

module.exports = router;