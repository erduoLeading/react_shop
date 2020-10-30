const Role = require('../shcema/roleSchema')

// 请求添加角色
exports.addRole = async cxt => {
    const {roleName} = cxt.request.body
    console.log(roleName)
    const result = await Role.findOne({roleName})
    if (result) {
        cxt.body = {
            status: 1,
            data: [],
            msg: "该角色已经存在"
        }
    } else {
        const role = await Role.create({roleName})
        cxt.body = {
            status: 0,
            data: {},
            msg: "角色创建成功"
        }
    }
}

// 请求获取角色
exports.getRoles = async cxt => {
    // const {} = cxt.request.query
    const roles = await Role.find()
    if (roles) {
        cxt.body = {
            status: 0,
            data: roles,
            msg: '获取角色列表成功'
        }
    } else {
        cxt.body = {
            status: 1,
            data: [],
            msg: '角色列表为空'
        }
    }
}

// 请求更新角色
exports.updateRole = async cxt => {
    const {_id, menus} = cxt.request.body
    console.log( cxt.request.body)
    const role = await Role.findById(_id)
    console.log(role.menus, menus)
    if(role.menus.toString() !== menus.toString()) {
    const result = await Role.updateOne({_id},{$set:cxt.request.body})
        cxt.body = {
            status: 0,
            data: [],
            msg: "角色权限修改成功"
        }
    } else {
        cxt.body = {
            status: 1,
            data: [],
            msg: "角色权限修改未变"
        }
    }
}

//获取单个角色的信息
exports.getRole = async cxt => {
    // console.log(cxt.query)
   
    const result = await Role.findById({_id:cxt.query.roleId})

    console.log(result)

    if(result){ //如果找到了该角色  就返回该角色的信息
        cxt.body = {
            status:0,
            msg:'角色查找成功',
            data:result
        }
    }else{
        cxt.body = {
            status:1,
            msg:'未找到该角色',
        }
    }
}