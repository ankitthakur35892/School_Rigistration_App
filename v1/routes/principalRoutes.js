const express = require('express');
const principalController = require('../controller/principalController');
const middleware = require('../../utility/verifyToken');
const router = express.Router();
router.post('/',              principalController.addPrincipal);
router.post('/verify',        principalController.verifyOtp);
router.post('/login',         principalController.login);
router.post('/changePassword',middleware.verifyToken,principalController.changePassword);
router.post('/forgetPassword',middleware.verifyToken,principalController.forgetPassword);
router.get('/',               middleware.verifyToken,principalController.findPrincipal);
router.put('/',               middleware.verifyToken,principalController.updatePrincipal);
router.delete('/:id',         middleware.verifyToken,principalController.deletePrincipal);

module.exports = router;
