const express = require('express')
const router = express.Router()
const controller = require('../../controllers/controllers')
const middlewares = require('../../middlewares/middlewares')


router.get('/', (req, res) => {
    res.render('signUp')
})
router.post('/', middlewares.validateCreatePassword, middlewares.validateSignUpEmail, async (req, res) => {
    try {
        await controller.signUp(req.body);
        res.redirect('/?message=User+created+successfully!');
    } catch (err) {
        res.redirect('/signUp?message=Something+went+wrong');
    }
})

module.exports = router;