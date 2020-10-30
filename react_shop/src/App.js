import React, {Suspense, lazy} from 'react';
import {
	Route,
	Switch,
	Redirect,
	BrowserRouter as Router
} from 'react-router-dom'
// import admin from './pages/admin/Admin'
// import login from './pages/login/Login'
import Task from './utils/Task'

const admin = lazy(() => import('./pages/admin/Admin'))
const login = lazy(() => import('./pages/login/Login'))

class App extends React.Component {
	componentDidMount() {
		this.startInterval()
	}

	startInterval() {
		setInterval(() => {

			for (let task in Task.updatecurrentStateTask) {
				if (Task.updatecurrentStateTask[task] !== null) {
					Task.updatecurrentStateTask[task]()
				}
			}
		}, 1000)
	}

	render() {
		return (
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<Route path="/login" component={login}/>
						<Route path="/admin" component={admin}/>
						<Redirect from="/*" to="/login"/>
					</Switch>
				</Suspense>
				{/*<Switch>*/}
				{/*<Route path="/login" component={login}/>*/}
				{/*<Route path="/admin" component={admin}/>*/}
				{/*<Redirect from="/*" to="/login"/>*/}
				{/*</Switch>*/}
			</Router>
		);
	}
}

export default App;
