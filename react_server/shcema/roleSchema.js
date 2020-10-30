const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    roleName: String,
    createTime: {
        type: Date,
        default: Date.now
    },
    authorizeTime: String,
    authorizePerson: String,
    menus: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('role', roleSchema)