const router = require('express').Router();

const apiRoutes = require('./api');
const familyNamesRoutes = require('./familynames-routes');

router.use('/', familyNamesRoutes);
router.use('/api', apiRoutes);

module.exports = router;