export default [
	{
		title: '首页', // 菜单标题名称
		key: '/admin/home', // 对应的path
		icon: 'home', // 图标名称
		public:true,//该权限开放给所有用户
	},
	{
		title: '商品管理',
		key: '/admin/products',
		icon: 'appstore',
		children: [ // 子菜单列表
			{
				title: '分类',
				key: '/admin/category',
				icon: 'bars'
			},
			//重定向写法，刷新的时候才会重定向到 /admin/product/home,
			{
				title: '商品',
				key: '/admin/product', // 写/admin/product/home的时候再点击进入商品添加页面获取不到标题
				icon: 'tool'
			},
			//非重定向写法：适合只有HomeProduct显示内容 (更推荐采用，写法更精简）
			// {
			// 	title: '商品',
			// 	key: '/admin/product/home',
			// 	icon: 'tool'
			// },
			/*菜单处不定义/admin/product/addupdate 和 /admin/product/detail 这两个路由的跳转按钮，会在/admin/product/home中定义，
			* 而不会在菜单中定义*/
			// {
			// 	title: '添加/修改商品',
			// 	key: '/admin/product/addupdate',
			// 	icon: 'tool'
			// },
			// {
			// 	title: '商品详情',
			// 	key: '/admin/product/detail',
			// 	icon: 'tool'
			// },
		]
	},

	{
		title: '用户管理',
		key: '/admin/user',
		icon: 'user'
	},
	{
		title: '角色管理',
		key: '/admin/role',
		icon: 'safety',

	},

	{
		title: '图形图表',
		key: '/admin/charts',
		icon: 'area-chart',
		children: [
			{
				title: '柱形图',
				key: '/admin/charts/bar',
				icon: 'bar-chart'
			},
			{
				title: '折线图',
				key: '/admin/charts/line',
				icon: 'line-chart'
			},
			{
				title: '饼图',
				key: '/admin/charts/pie',
				icon: 'pie-chart'
			},
		]
	}
]