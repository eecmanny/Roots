const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ChildrenRoutes = require('./ChildrenRoutes');

router.use('/users', userRoutes);
//http://localhost:3001/api/children/
router.use('/children', ChildrenRoutes);

module.exports = router;
