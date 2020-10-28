'use strict';

const router = require('express').Router();
const authMiddleware = require('../../middleware/authenticate');
const UserController = require('../../controllers/user');

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.get('/me', authMiddleware, UserController.me);
router.patch('/me', authMiddleware, UserController.revise);
router.patch('/:id(\\d+)', authMiddleware, UserController.update);
router.delete('/:id(\\d+)', authMiddleware, UserController.destroy);
router.get('/:id?', authMiddleware, UserController.find);

module.exports = router;
