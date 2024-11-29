const express = require('express')
const router = express.Router()
const controller = require('../../controllers/controllers')
const middlewares = require('../../middlewares/middlewares')


router.get('/',middlewares.ensureAuthenticated, (req, res) => {
    res.render("obtainPrivileges")
});
router.post('/', middlewares.validateSecretCode, async (req, res) => {
    await controller.grantMemberPrivilege(req.user.id);
    res.redirect('/?message=You+are+now+an+admin!');
});


module.exports = router;