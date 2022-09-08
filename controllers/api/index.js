const router = require('express').Router();

const userRoutes = require('./user-routes');
const absenceRoutes = require('./absence-routes');
const leaveRoutes = require('./leave-routes');
const departmentRoutes = require('./department-routes');
const mailRoutes = require('./mail-routes');

router.use('/users',userRoutes);
router.use('/absences',absenceRoutes);
router.use('/leave',leaveRoutes);
router.use('/department',departmentRoutes);
router.use('/mail',mailRoutes);

module.exports = router;