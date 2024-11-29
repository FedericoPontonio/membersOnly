const pool = require('./pool');

async function retrieveAllMessages() {  //all messages in order by timestamp
    const {rows} = await pool.query(
        "SELECT m.id AS message_id, m.content, m.timestamp, u.id AS user_id, u.first_name, u.last_name, u.email FROM messages m JOIN users u ON m.user_id = u.id ORDER BY m.timestamp DESC"
    )
    return rows
};

async function newMessage(messageContent, userId) {
    const query = 'INSERT INTO messages (content, user_id) VALUES ($1, $2)';
    await pool.query(query, [messageContent, userId])
}

async function deleteMessage(messageId) {
    const query = 'DELETE FROM messages WHERE id = $1';
    await pool.query(query, [messageId])
    
}


module.exports = {
    retrieveAllMessages,
    newMessage,
    deleteMessage,
}