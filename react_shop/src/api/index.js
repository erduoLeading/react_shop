import axios from 'axios'
import jsonp from 'jsonp'
axios.interceptors.response.use(res=>res.data)

// 登录请求
export const requireLogin = (userInfo) => axios.post('/login',userInfo)
// 天气请求
export const reqWeather = (city="长沙") => {
	return new Promise((res)=>{
		jsonp('http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2&callback=__jp1',(err,data)=>{
			// console.log("data:",data,err)
			if (err) {
				res({
					dayPictureUrl: '',
					weather: '晴天',
					wind: '西风',
					temperature: '10~20℃'
				})
			}else {
				if (data.status !== 'success') {
					reqWeather(city)
				} else {
					res(data.results[0].weather_data[0])
				}
			}
		})
	})
}

// 添加商品分类请求
export const reqAddCategory = (categoryInfo) => axios.post('/category/add', categoryInfo)

// 请求获取商品分类 ’0‘代表一级分类， 其他他代表所有分类
export const  reqGetCategory = (parentId) => axios.get('/category/list',{params:{parentId}})

// 请求删除商品分类
export const reqRemoveCategory = (categoryInfo) => axios.post('/category/remove', categoryInfo)

// 请求商品分类通过_id
export const reqGetCategoryById = (idInfo) => axios.get(('/category/byid'), {params:idInfo})

// 请求修改商品分类
export const reqUpdateCategory = (categoryInfo) => axios.post('/category/update', categoryInfo)

// 请求删除商品图片
export const reqDeleteImg = (name) => axios.post('/img/delete', {name})

// 请求添加商品
export const reqAddProduct = productInfo => axios.post('/product/add', productInfo)

// 请求获取商品
export const reqGetProduct = (page, num) => axios.get('/product/get', {params:{page, num}})

// 请求按描述或名称搜索商品
export const reqSearchProducts = (searchInfo) => axios.get('/product/search', {params:searchInfo})

// 请求修改商品
export const reqUpdateProduct = (productInfo) => axios.post('/product/update', productInfo)

// 请求添加角色
export const reqAddRole = (roleInfo) => axios.post('/role/add',roleInfo)

// 请求获取角色
export const reqGetRoles = () => axios.get('/role/get')

// 请求更新角色
export const reqUpdateRole = (roleInfo) => axios.post('/role/update', roleInfo)


//请求单个角色的接口函数
export const reqGetRole = (roleId)=>axios.get('/role/info',{params:{roleId}})



//请求添加用户信息的接口函数
export const reqAddUser = uesrInfo=>axios.post('/user/add',uesrInfo)

//请求所有的用户集合的接口函数
export const reqGetUsers = ()=>axios.get('/user/list')

//请求修改用户信息的接口函数
export const reqUpdateUser = (userInfo)=>axios.post('/user/update',userInfo)


//请求删除用户信息的接口函数
export const reqDeleteUser = (userInfo)=>axios.post('/user/delete',userInfo)