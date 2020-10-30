import React, {Component} from 'react';
// import {Switch,Route, Redirect} from 'react-router-dom'
// import AddUpdateProduct from "./AddUpdateProduct"
// import HomeProduct from "./HomeProduct"
// import DetailProduct from "./DetailProduct"
/*
* 	/admin/product/addUpadte 添加商品页面
* 	/admin/product/ 展示所有商品的页面
* 	/admin/product/addUpadte 修改商品页面
* 	/amin/product/detail 商品详情页面
*
* */
class Product extends Component {
	render() {
		return (
			<div>
				{/*<Switch>*/}jjjjjjjjjjjj
					{/*/!*单独用一个路由去显示homeProduct的内容，而不是直接在Product组件中定义dom内容，因为*/}
					{/*直接定义代表这些内容在每一个页面都会显示*!/*/}
 					{/*<Route path='/admin/product/home' exact component={HomeProduct}/> /!*Product重定向写法2：路由组件覆盖, 能够满足跳转到addupdate和detail*!/*/}
					{/*<Route path='/admin/product/addupdate'   component={AddUpdateProduct}/>*/}
					{/*<Route path='/admin/product/detail' component={DetailProduct}/>*/}
				{/*</Switch>*/}
			</div>
		);
	}
}

export default Product;