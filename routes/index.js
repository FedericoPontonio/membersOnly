const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllers')
const middlewares = require('../middlewares/middlewares')


router.get('/', async (req, res) => {
    const messages = await controller.retrieveAllMessages();
    res.render('index', { message: req.query.message, messages: messages });
});

module.exports = router;