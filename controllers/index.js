const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const approvalQueueRoutes = require('./approval-queue-routes');
const profileRoutes = require('./profile-routes');

router.use('/approval-queue',approvalQueueRoutes);
router.use('/dashboard',dashboardRoutes);
router.use('/api',apiRoutes);
router.use('/',homeRoutes);
router.use('/profile',profileRoutes);

// This is so that if we make a request to any endpoint that doesn't exist,
// we will receive a 404 error indicating we have requested an incorrect resource:
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;