const express = require('express')
const router = express.Router()
const controller = require('../../controllers/controllers')


router.get('/', async (req, res) => {
    res.render('newMessage');
});
router.post('/', async (req, res) => {
    await controller.newMessage(req.body.content, req.user.id);
    res.redirect('/');
});

module.exports = router;