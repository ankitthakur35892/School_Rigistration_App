const express = require('express');
const principalController = require('../controller/principalController');
const middleware = require('../../utility/verifyToken');
const router = express.Router();
router.post('/',principalController.addPrincipal);
router.post('/verify',principalController.verifyOtp);
router.post('/changePassword',middleware.verifyToken,principalController.changePassword);
router.post('/forgetPassword',middleware.verifyToken,principalController.forgetPassword);
router.get('/',principalController.findPrincipal);
router.put('/',principalController.updatePrincipal);
router.delete('/:id',principalController.deletePrincipal);
router.post('/login',principalController.login);

module.exports = router;
