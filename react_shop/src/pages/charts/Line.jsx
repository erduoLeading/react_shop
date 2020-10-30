import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts';
import {
	Card,
	Button
} from 'antd'

export default class Line extends Component {

	state = {
		books:[1000,2000,1500,3000,2000,1200,800],//预订量
		sales:[800,1500,1300,2800,1500,1000,500],   //销量
	}
	getOption1 = ()=>{
		let options = {
			title:{
				text:'折线图-1',
				textStyle:{
					color:'pink'
				}

			},
			legend: {//图例组件
				data: ['存货'],
				icon:'circle'

			},
			tooltip: {  //提示框组件
				trigger: 'axis'
			},
			xAxis:{
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			yAxis:{},
			series:[
				{
					name:'存货',
					type:'line', //柱形图
					data:[1000,2000,1500,3000,2000,1200,800]
				}
			]
		}
		return options
	}


	getOption2 = (books,sales)=>{
		let options = {
			title:{
				text:'折线图-2',
				textStyle:{
					color:'pink'
				}

			},
			legend: {//图例组件
				data: ['订单量','销量'],
				icon:'circle'

			},
			tooltip: {  //提示框组件
				trigger: 'axis'
			},
			xAxis:{
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			yAxis:{},
			series:[    //数据源
				{
					name:'订单量',
					type:'line',
					data:books
				},
				{
					name:'销量',
					type:'line',
					data:sales
				}
			]
		}
		return options
	}

	update = ()=>{
		this.setState(state=>({
			books:state.books.map(item=>item+100),
			sales:state.sales.map(item=>item-20),
		}))
	}
	render() {
		const title = <Button type={'primary'} onClick={this.update}>更新数据</Button>
		const {books,sales} = this.state
		return (
			<div>
				<Card>
					<ReactEcharts option={this.getOption1()} />
				</Card>
				<Card title={title}>
					<ReactEcharts option={this.getOption2(books,sales)} />
				</Card>
			</div>

		);
	}
}