import Data from "../utils/Constant"

let listConfig = (config) => {
	let defaultConfig = {
		defaultPageSize: Data.PAGE_SIZE,
		current: 1,
	}
	return Object.assign({}, defaultConfig, config)
}


export default listConfig