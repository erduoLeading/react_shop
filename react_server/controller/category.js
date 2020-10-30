const Category = require('../shcema/categorySchema')

// 获取分类
exports.getCategory = async cxt => {
    const {parentId} = cxt.request.query
    const category = await Category.find({parentId})
    console.log(category,'分类获取成功')
    if (category.length) {
        cxt.body = {
            status: 0,
            data: category,
            msg: '分类信息获取成功'
        }
    } else {
        cxt.body = {
            status: 1,
            data: [],
            msg: '暂无分类内容'
        }
    }

}


// 添加分类
exports.addCategory = async cxt => {
    const {parentId, categoryName} = cxt.request.body
    const category = await Category.findOne({parentId,categoryName})
    if (!category) {
        // const result = await Categorys.findOne({ categoryName: categoryName })
        new Category({
            parentId,
            categoryName,
        }).save()
        cxt.body = {
            status: 0,
            data: { parentId, categoryName},
            msg: '',
        }
    } else {
        console.log("该分类已存在无法添加", category)
        cxt.body = {
            status: 1,
            data: {},
            msg: "分类已存在"
        }
    }
}


// 删除分类
exports.removeCategory = async cxt => {
    const {parentId, categoryName} = cxt.request.body
    // 一级分类 parentId为'0'且name相同
    // 二级分类 prentId为_id且名字相同
    const result = await Category.remove({parentId,categoryName})
    console.log("result:",result)
    if (result["ok"] === 1) {
        cxt.body = {
            status: 0,
            data: [],
            msg: '删除成功'
        }
    } else {
        cxt.body = {
            status: 1,
            data: [],
            msg: '删除失败'
        }
    }
    
}


// 修改分类
exports.updateCategory = async cxt => {
    const {_id, categoryName} = cxt.request.body;
    const result = await Category.findOne({_id, categoryName})
    if (result) {
        cxt.body = {
            status: 1,
            msg: '分类名重复，请重新修改'
        }
    } else {
       const result = await Category.updateOne({_id},{$set:{categoryName}})
        console.log("update:",result)
        cxt.body = {
            status: 0,
            msg: '分类名修改成功'
        }
    }
}

// 根据_id获取商品分类
exports.getCategoryById = async cxt => {
    const {_id1, _id2} = cxt.request.query
    let result2
    const result1 = await Category.findById(_id1)
    if (_id2) {
        result2 = await Category.findById(_id2)
            cxt.body = {
                status: 0,
                data:{ 
                    categoryName1:result1.categoryName,
                    categoryName2:result2.categoryName,
                },
                msg: result1 && result2 ? '获取分类名称成功' :'获取分类名称失败'
            }
    } else {
        cxt.body = {
            status: 0,
            data:{ 
                categoryName1:result1.categoryName
            },
            msg: result1 ? '获取分类名称成功' :'获取分类名称失败'
        }
    }
  
}