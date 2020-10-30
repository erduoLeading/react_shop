const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const mongoose = require('mongoose')
const bodyParser = require('koa-body-parser');
const multer = require('koa-multer')
const path = require('path')

const User = require('./shcema/userSchema')


const {addCategory, getCategory, removeCategory, updateCategory, getCategoryById} = require('./controller/category')

const {imgUpload, imgDelete, productAdd, productGet, ProductSearch, ProductUpdate} = require('./controller/product')

const {addRole, getRoles, updateRole, getRole} = require('./controller/role')

const { addUser, getUsers, updateUser, deleteUser } = require('./controller/user')

const app = new Koa()
const router = new Router();


//引入用户的模型
app.use(static('./public'))
app.use(bodyParser());
app.use(router.routes())









//文件上传配置
var storage = multer.diskStorage({
    //图片保存在后台的路径 'public/uplyoads/'
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        // var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        // cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
        const extname = path.extname(file.originalname) ;//extname方法获取图片的后缀名
        cb(null, Date.now() + extname);
    }
})
//加载配置
var upload = multer({ storage: storage });

//登录路由
router.post('/login', async cxt => {
    //获取用户的密码和用户名
    //根据用户名和密码查找  如果找到了该用户 则登录成功 
    //否则 用户名或者密码不正确
    const { username, password } = cxt.request.body
    const user = await User.findOne({username, password})
    console.log(user)
    if (user) {
        cxt.body = {
            status: 0,
            data: user,
            msg: '用户登录成功'
        }
    } else {
        cxt.body = {
            status: 1,
            data: {},
            msg: '用户名或者密码不正确'
        }
    }
})

// 分类路由
router.get('/category/list', getCategory)
router.post('/category/add', addCategory)
router.post('/category/remove', removeCategory)
router.post('/category/update',updateCategory)
router.get('/category/byid', getCategoryById)


// 商品路由 'image'该字符串对应的是前端的name属性的字符串
router.post('/img/upload', upload.single('image'), imgUpload)
router.post('/img/delete', imgDelete)
router.post('/product/add', productAdd)
router.get('/product/get', productGet)
router.get('/product/search', ProductSearch)
router.post('/product/update', ProductUpdate)

//角色路由
router.post('/role/add', addRole)
router.get('/role/get', getRoles)
router.post('/role/update', updateRole)
router.get('/role/info', getRole)


//用户的路由处理
router.post('/user/add', addUser)
router.get('/user/list', getUsers)
router.post('/user/update', updateUser)
router.post('/user/delete', deleteUser)



//连接27017下的project数据库
mongoose.connect('mongodb://localhost:27017/react_shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('react_shop数据库链接成功')
    app.listen(60005, () => {
        console.log('60005端口启动了')
    })
}).catch(() => {
    console.log('数据库链接失败')
})