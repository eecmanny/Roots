const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ChildrenRoutes = require('./ChildrenRoutes');

router.use('/users', userRoutes);
router.use('/children', ChildrenRoutes);

module.exports = router;
