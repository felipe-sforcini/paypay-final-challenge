const { findAllUsers } = require('../../models/users');

const showAllUsers = async (req, res) => {
    try {
        const allUsers = await findAllUsers();

        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = {
    showAllUsers
}