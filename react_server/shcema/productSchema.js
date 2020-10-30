const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    description: String,
    price: String,
    /**
     * 1.有二级分类的情况：
     * pCategoryId存储一级分类对应的ID
     * categoryId存储二级分类对应的ID 自身的ID(没啥用)
     * 2.只有一级分类的情况：
     * pCategroyId存储ID '0'
     * categoryId存储对应一级分类ID
     */
    pCategoryId: String, // 1
    categoryId: String,// 2
    imgs: Array,
    details: String
    

})

module.exports = mongoose.model('product', productSchema)