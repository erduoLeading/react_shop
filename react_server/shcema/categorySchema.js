const mongoose =  require('mongoose')

//设置用户表的数据格式
const categorySchema = new mongoose.Schema({
    parentId: {
        default: '0',
        type: String
    },
    categoryName: String
})

//project 数据库下的users  使用userSchema
module.exports = mongoose.model('category',categorySchema)