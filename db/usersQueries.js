const pool = require('./pool');

async function signUp(reqBody) {
    const query = 'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)';

    await pool.query(query, [reqBody.email, reqBody.firstName, reqBody.lastName, reqBody.password])
};

async function retrieveAllEmails() {
    const {rows} = await pool.query("select email from users")
    return rows
}

async function getUserCredentials(email) {
    const query = "SELECT email, password, id FROM users WHERE email = $1";
    const {rows} = await pool.query(query, [email]);
    return rows[0]
}

async function getUserById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const {rows} = await pool.query(query, [id]);
    return rows[0]
}

async function grantMemberPrivilege(id) {
    await pool.query('UPDATE users SET is_member = true WHERE id = $1', [id])
}

module.exports = {
    signUp,
    retrieveAllEmails,
    getUserCredentials,
    getUserById,
    grantMemberPrivilege,
}