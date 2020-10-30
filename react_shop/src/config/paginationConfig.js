import Data from "../utils/Constant"

let paginationConfig = (config) => {
	let defaultConfig = {
		defaultPageSize: Data.PAGE_SIZE,
		current: 1,
	}
	return Object.assign({}, defaultConfig, config)
}


export default paginationConfig