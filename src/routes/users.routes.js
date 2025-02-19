// src/routes/users.routes.js
const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:usr_id', updateUser);
router.delete('/users/:usr_id', deleteUser);

module.exports = router;