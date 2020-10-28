'use strict';

const router = require('express').Router();
const userRoutes = require('./users');

router.get('/', (req, res) => res.json({ connected: true }));

// Users
router.use('/users', userRoutes);

module.exports = router;
