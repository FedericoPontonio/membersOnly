const userQueries = require('../db/usersQueries');
const messagesQueries = require('../db/messagesQueries');
const bcrypt = require('bcryptjs');


async function signUp(reqBody) {
    reqBody.password = await bcrypt.hash(reqBody.password, 10); 
    await userQueries.signUp(reqBody)
};

async function grantMemberPrivilege(id) {
    await userQueries.grantMemberPrivilege(id);
};

async function retrieveAllMessages() {
    const rows = await messagesQueries.retrieveAllMessages();
    return rows
}

async function newMessage(messageContent, userId) {
    await messagesQueries.newMessage(messageContent, userId);
}

async function deleteMessage(messageId) {
    await messagesQueries.deleteMessage(messageId);
    
}

module.exports = {
    signUp,
    grantMemberPrivilege,
    retrieveAllMessages,
    newMessage,
    deleteMessage,
}