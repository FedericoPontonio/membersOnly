const queries = require('../db/usersQueries');

const validatePassword = (req, res, next) => {
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            error: "Passwords do not match. Please try again.",
        });
    }
    next();
};

const validateEmail = async (req, res, next) => {
    const registeredEmails = await queries.retrieveAllEmails();
    for (let i =0;i<registeredEmails.length; i++ ) {
        if (req.body.email === registeredEmails[i].email) {
            return res.status(400).json({
                error: "Email already registered.",
            });
        }
    };
    next();
};

const validateSecretCode = (req, res, next) => {
    const secretCode = 'master chief';
    if(req.body.insertSecretCode !== secretCode) {
        res.redirect('/?message=The+secret+code+is+incorrect.');
    }
    else {
        next();
    }
};


const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login"); // Redirect to login if not authenticated
};

module.exports = {
    validatePassword,
    validateEmail,
    validateSecretCode,
    ensureAuthenticated,
}