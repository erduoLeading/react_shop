const fs = require('fs')
const path = require('path')
const Product = require('../shcema/productSchema');
// 上传图片
exports.imgUpload = async cxt => {
    // 能拿到修改好的一系列文件数据, 然后根据前端的需要传递给前端
    const file = cxt.req.file
    console.log("图片上传成功")
    console.log(file)
    cxt.body = {
        status: 0,
        msg: '图片上传后台成功',
        data: {
            name: file.filename,
            url: 'http://localhost:60005/uploads/'+file.filename //服务器存放文件的路径
        }
    }
}

// 删除图片
exports.imgDelete = async cxt => {
    const { name } = cxt.request.body
    const filename = path.join(__dirname, '../public/uploads', name)
    fs.unlinkSync(filename)
    cxt.body = {    //图片上传后台成功
        status: 0,
        msg: '图片删除成功',
    }
}

// 添加商品
exports.productAdd = async cxt => {
    const {productName, description, price, pCategoryId, categoryId, imgs, details} = cxt.request.body
    console.log(cxt.request.body)
    const result = await Product.findOne({productName});
    if (result) {
        cxt.body = {
            status: 1,
            data: [],
            msg: '该商品已经存在'
        }
    } else {
        const product = await Product.create({productName, description, price, pCategoryId, categoryId, imgs, details})
        cxt.body = {
            status: 0,
            data: product,
            msg: '添加商品成功'
        }
    }
   
}

// 获取商品
exports.productGet = async cxt => {
    let {page, num} = cxt.request.query
    page = +page;
    num = +num;
    let start = (page-1)*num
    const products = await Product.find().skip(start).limit(num)
    const total = await Product.find().countDocuments()
    const result = {
        products,
        total
    }
    if (products) {
        cxt.body = {
            status: 0,
            data:result,
            msg: '获取商品成功'
        }
    } else {
        cxt.body = {
            status: 1,
            data:[],
            msg: '获取商品失败'
        }
    }
    
}

// 搜索商品
exports.ProductSearch = async cxt => {
    let {page, num, searchType, keyWords} = cxt.request.query
    page = +page;
    num = +num;
    let start = (page-1)*num
    let products
    let total
    if (searchType === 'productName') {
        products = await Product.find({productName: new RegExp(keyWords)}).skip(start).limit(num)
        total  = await Product.find({productName: keyWords}).countDocuments()
    } else if (searchType === 'description') {
        products = await Product.find({description: new RegExp(keyWords)}).skip(start).limit(num)
        total  = await Product.find({description: keyWords}).countDocuments()
    }
    
    const result = {
        products,
        total
    }
    if (products) {
        cxt.body = {
            status: 0,
            data:result,
            msg: '查找商品成功'
        }
    } else {
        cxt.body = {
            status: 1,
            data:[],
            msg: '查找商品失败'
        }
    }
    
}


// 修改商品

exports.ProductUpdate = async cxt => {
    const {_id,productName, description, price, pCategoryId, categoryId, imgs, details } = cxt.request.body
    console.log("商品参数：",_id,productName, description, price, pCategoryId, categoryId, imgs, details )
    // 修改的可以是任意值，名称，描述，价格等等可以不变，但是新名称不能为已经存在的名称相同
    let result = await Product.findOne({productName})
    console.log(result._id, _id)
    if (result && result._id != _id) {
        cxt.body = {
            status: 1,
            data: [],
            msg: '该商品名已经存在，请重新修改'
        }
    } else {
     result = await Product.updateOne(result,{$set:{productName, description, price, pCategoryId, categoryId, imgs, details}})
        cxt.body = {
            status: 0,
            data: [],
            msg: '修改商品成功'
        }
    }

  
}





 /*
        page   num     result
        1       3      [0,1,2]
        2       3      [3,4,5]
        3       3      [6,7,8]
        4       3      [9,10,11]
        n       3      [(page-1)*num,(page-1)*num+1,(page-1)*num+2]
    */
//根据页码，和条数返回对应的数据
// function filterPage(data, page, num) {
//     page = +page;
//     num = +num;
//     let total = data.length
//     let start = (page-1) * num;
//     let end = start + num > data.length ? total : start+num;
//     let arr = []
//     for(let i = start; i < end; i++) {
//         arr.push(data[i])
//     }
//     console.log("arr:",arr)
//     return {
//         products: arr,
//         total
//     }
// }