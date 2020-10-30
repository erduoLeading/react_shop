
class Storage {
	getUser() {
		return JSON.parse(sessionStorage.getItem('user'));
	}
	setUser(value) {
		sessionStorage.setItem('user',JSON.stringify(value));
	}
	removeUser() {
		sessionStorage.removeItem('user')
	}
}

export default new Storage()