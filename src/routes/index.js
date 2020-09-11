const router = require('express').Router();
const patientRoutes = require('./patients');

router.get('/', (req, res) => res.json({ connected: true }));

// Patients
router.use('/patients', patientRoutes);

module.exports = router;
