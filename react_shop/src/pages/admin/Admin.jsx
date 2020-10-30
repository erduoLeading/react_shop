import React, { Component, lazy, Suspense } from "react";
import storage from '../../utils/storage'
import { Layout } from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom'
import LeftNav from '../../components/left-nav/LeftNav'
import Header from '../../components/header/Header'
// import Home from '../home/Home'
// import Product from '../product/Product'
// import HomeProduct from "../product/HomeProduct"
// import AddUpdateProduct from "../product/AddUpdateProduct"
// import DetailProduct from "../product/DetailProduct"
// import Category from "../category/Category"
// import Bar from "../charts/Bar"
// import Line from "../charts/Line"
// import Pie from "../charts/Pie"
// import User from "../user/User"
// import Role from "../role/Role"
const Home = lazy(()=> import("../home/Home"))
const HomeProduct = lazy(()=> import("../product/HomeProduct"))
const AddUpdateProduct = lazy(()=> import("../product/AddUpdateProduct"))
const DetailProduct = lazy(()=> import("../product/DetailProduct"))
const Category = lazy(()=> import("../category/Category"))
const Bar = lazy(()=> import("../charts/Bar"))
const Line = lazy(()=> import("../charts/Line"))
const Pie = lazy(()=> import("../charts/Pie"))
const User = lazy(()=> import("../user/User"))
const Role = lazy(()=> import("../role/Role"))
const { Sider, Content, Footer } = Layout;
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
	  const user = storage.getUser();
	  if (user === null) {
		  return <Redirect to="/login"/>

	  }
    return (
		  <Layout style={{height:'100%'}}>
			  <Sider>
				  <LeftNav/>
			  </Sider>
			  <Layout>
				  <Header/>
				  <Content
				  	style={{
				  		background: "#fff",
						margin: '20px'
					}}>
					  <Suspense fallback={<div>Loading...</div>}>
						  <Switch>
							  <Route path="/admin/home" component={Home}/>
							  <Redirect exact from="/admin/product" to="/admin/product/home"/>
							  <Route path="/admin/product/home" component={HomeProduct}/>
							  <Route path='/admin/product/addupdate'   component={AddUpdateProduct}/>
							  <Route path='/admin/product/detail' component={DetailProduct}/>


							  <Route path="/admin/category" component={Category}/>
							  <Route path="/admin/user" component={User}/>
							  <Route path="/admin/role" component={Role}/>
							  <Route path="/admin/charts/bar" component={Bar}/>
							  <Route path="/admin/charts/line" component={Line}/>
							  <Route path="/admin/charts/pie" component={Pie}/>
						  </Switch>
					  </Suspense>
					  {/*<Switch>*/}
						  {/*<Route path="/admin/home" component={Home}/>*/}


						  {/*/!*当菜单定义了该路由/admin/product可以采用重定向写法：(不推荐）*/}
						  						{/*这种嵌套写法是product组件和HomeProduc同时显示*/}
												{/*这种嵌套写法是product组件和HAddUpdateProduct同时显示*/}
												{/*这种嵌套写法是product组件和DetailProduct同时显示,*/}
												{/*如果product里面没内容，就只显示homeProduct,具体写法如下*/}
						  {/**!/*/}
						  {/*/!*=============重定向写法=================*!/*/}

						  {/*/!*<Route path="/admin/product" component={Product}>*!/*/}
							  {/*/!*<Redirect from="/admin/product" to="/admin/product/home"/>*!/*/}
							  {/*/!*<Route path="/admin/product/home" component={HomeProduct}/>*!/*/}
						      {/*/!*<Route path="/admin/product/category" component={Category}/>*!/*/}
							  {/*/!*<Route path='/admin/product/addupdate'   component={AddUpdateProduct}/>*!/*/}
							  {/*/!*<Route path='/admin/product/detail' component={DetailProduct}/>*!/*/}
						  {/*/!*</Route>*!/*/}
						  {/*/!*=============重定向写法=================*!/*/}


						  {/*/!*菜单定义了该路由/admin/product/home,可以采用非重定向写法：*!/*/}
						  {/*/!*===============非重定向写法===================*!/*/}
						  {/*/!*<Route path="/admin/product/category" component={Category}/>*!/*/}
						  {/*/!*<Route path="/admin/product/home" key={1} component={HomeProduct}/>*!/*/}
						  {/*/!*<Route path='/admin/product/addupdate'   component={AddUpdateProduct}/>*!/*/}
						  {/*/!*<Route path='/admin/product/detail' component={DetailProduct} />*!/*/}
						  {/*/!*===============非重定向写法===================*!/*/}

						  {/*/!*重定向与非重定向结合*!/*/}
						  {/*<Redirect exact from="/admin/product" to="/admin/product/home"/>*/}
						  {/*<Route path="/admin/product/home" component={HomeProduct}/>*/}
						  {/*<Route path='/admin/product/addupdate'   component={AddUpdateProduct}/>*/}
						  {/*<Route path='/admin/product/detail' component={DetailProduct}/>*/}


						  {/*<Route path="/admin/category" component={Category}/>*/}
						  {/*<Route path="/admin/user" component={User}/>*/}
						  {/*<Route path="/admin/role" component={Role}/>*/}
						  {/*<Route path="/admin/charts/bar" component={Bar}/>*/}
						  {/*<Route path="/admin/charts/line" component={Line}/>*/}
						  {/*<Route path="/admin/charts/pie" component={Pie}/>*/}
					  {/*</Switch>*/}
				  </Content>
				  <Footer
				  	style={{textAlign:'center', fontWeight: 'blod', fontSize: '17px'}}
				  >
					  react + koa + mongo
				  </Footer>
			  </Layout>
		  </Layout>
    );
  }
}

export default Admin;
