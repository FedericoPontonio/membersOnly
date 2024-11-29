const express = require('express')
const router = express.Router()
const controller = require('../../controllers/controllers')


router.get('/:messageId', async (req, res) => {
    res.render('confirmDeletion', { messageId: req.params.messageId });
});

router.post('/:messageId', async (req, res) => {
    if (req.body.answer === 'yes') {
        await controller.deleteMessage(req.params.messageId);
        res.redirect('/?message=Message+deleted+successfully.');
    }  else
        res.redirect('/?message=Message+deletion+aborted.');
    
});


module.exports = router;