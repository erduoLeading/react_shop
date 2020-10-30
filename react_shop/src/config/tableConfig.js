import paginationConfig from './paginationConfig'
// Object.assing对于浅拷贝遵循，相同则覆盖，不同则添加新属性。 对于引用型对象，会将整个旧对象进行覆盖,完全变为新对象，
/*
* 	Object.assign({}, {a:1,aa:{aa:11,bb:22}}, {a:'a',aa:{cc:'cc'}})
*   运行结果：{a: "a", aa: {…}}
*   {
*   	a: "a"
		aa: {cc: "cc"}
*   }

*
* */
let tableConfig = (config = {}) => {
	let defaultConfig = {
		size: "small",
		rowKey: '_id',
	}
	let result = Object.assign( {}, defaultConfig, config)
		result.pagination = paginationConfig(config.pagination || {})
	return result
}

export default tableConfig