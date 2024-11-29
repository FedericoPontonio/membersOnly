const express = require('express')
const router = express.Router()
const passport = require('../../config/passport');




router.get('/', async (req, res) => {
    res.render("login")
});

router.post(
    '/',
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true, // Enable this if you want to send failure messages
    })
);

module.exports = router;