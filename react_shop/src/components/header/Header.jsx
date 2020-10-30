import React, {Component} from 'react';
import storage from '../../utils/storage'
import'./header.less'
import { Modal } from 'antd'
import {withRouter} from 'react-router-dom'
import menuConfig from '../../config/menusConfig'
import Task from '../../utils/Task'
import {reqWeather} from "../../api"
import MyButton from "../my-button/MyButton"

const { confirm } = Modal;
class Header extends Component {
	constructor (props) {
		super(props)
		this.state = {
			currentTime: this.formatTime(),
			dayPictureUrl: '',
			weather: '',
			wind: '',
			temperature: '',
		}
	}
	UNSAFE_componentWillMount() {
		this.user = storage.getUser().username;
		this.time = new Date().toLocaleString();
	}
	getWeather = async () => {
		const {dayPictureUrl, weather, wind, temperature} = await reqWeather("长沙");
		this.setState({
			dayPictureUrl,
			weather,
			wind,
			temperature
		})
	}
	componentDidMount() {
		// 实时更新天气 ,由于天气会有警告，不建议实时获取
		// Task.updatecurrentStateTask.weather = async ()=>{
				this.getWeather()
		// }
		// 实时更新时间
		Task.updatecurrentStateTask.time = ()=>{
			this.setState({
				currentTime: this.formatTime(),
			})
		}
		// Task.updatecurrentStateTask.weather();
		Task.updatecurrentStateTask.time();

	}
	componentWillUnmount() {
		Task.updatecurrentStateTask.time = null;
		// Task.updatecurrentStateTask.weather = null;
	}
	formatTime() {
		let time = new Date()
		let year = time.getFullYear()
		let month = time.getMonth() + 1
		let date = time.getDate()
		let hours = time.getHours()
		let minutes = time.getMinutes()
		let seconds = time.getSeconds()
		return year + "/"
			+ (month < 10 ? '0' + month : month) + "/"
			+ (date < 10 ? '0' + date : date) + "/ "
			+ (hours < 10 ? '0' + hours : hours) + ":"
			+ (minutes < 10 ? '0' + minutes : minutes) + ":"
			+ (seconds < 10 ? '0' + seconds : seconds);

	}
	loginOut = () => {
		confirm({
			title: '你去确定要退出登录吗？',
			onOk:()=>{
				storage.removeUser()
				this.props.history.push('/login')
			},
			onCancel() {

			},
		});
	}
	getTitle = () => {
		const {pathname} = this.props.location
		let title = '';
			menuConfig.forEach((item,index) => {
				if (item.children) {
					item.children.forEach(child=> {
						// console.log(pathname, child.key)
						if (pathname.includes(child.key) ) title = item.title;
					})
				} else {
					if (pathname.includes(item.key)) title =  item.title;
				}
			})
		return title
	}
	render() {
		let {currentTime, dayPictureUrl, weather, wind, temperature} = this.state
		return (
			<div className="header">
				<div className="header-top">
					<span>欢迎,{this.user}</span>
					<MyButton handleClick={this.loginOut}>退出</MyButton>
				</div>
				<div className="header-bottom">
					<span className="header-bottom-left">{this.getTitle()}</span>
					<div className="header-bottom-right">
						<span>{currentTime}</span>
						<img src={dayPictureUrl || "http://api.map.baidu.com/images/weather/day/xiaoyu.png"} alt="" />
						<span>{weather || '晴天'}</span>
						<span>{temperature || '西风'}</span>
						<span>{wind || '10~20℃'}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Header);