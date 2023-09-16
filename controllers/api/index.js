const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ChildrenRoutes = require('./ChildrenRoutes');
const GrandChildrenRoutes = require('./ChildrenRoutes');

router.use('/users', userRoutes);

//http://localhost:3001/api/children/
router.use('/children', ChildrenRoutes);

//http://localhost:3001/api/children/
router.use('/grandchildren', GrandChildrenRoutes);

module.exports = router;
