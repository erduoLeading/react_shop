import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts';
import {
	Card,
	Button
} from 'antd'

export default class Pie extends Component {

	getOption1 = ()=>{
		let options = {
			title:{
				text:'饼图-1',
				textStyle:{
					color:'pink'
				},
				// x:'center'

			},
			legend: {//图例组件
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				icon:'circle',
				orient:'vertical',
				right:20,
				top:20,
			},
			tooltip: {  //提示框组件
				trigger: 'item',
				formatter:'{a}<br/>{b}:{c}({d}%)'
			},
			series:[
				{
					name:'存货',  //{a}
					type:'pie', //柱形图
					data:[{
						value:1000, //{c}
						name:'周一' //在折线的后面添加文字  {b}
					},{
						value:2000,
						name:'周二'
					},{
						value:1500,
						name:'周三'
					},{
						value:3000,
						name:'周四'
					},{
						value:1200,
						name:'周五'
					},{
						value:2000,
						name:'周六'
					},{
						value:800,
						name:'周日'
					}]
				}
			]
		}
		return options
	}

	getOption2 = ()=>{
		let options = {
			title:{
				text:'饼图-2',
				textStyle:{
					color:'pink'
				},
				// x:'center'

			},
			legend: {//图例组件
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				icon:'circle',
				orient:'vertical',
				right:20,
				top:20,

			},
			tooltip: {  //提示框组件
				trigger: 'item',
				formatter:'{a}<br/>{b}:{c}({d}%)'
			},
			series:[
				{
					name:'存货',  //{a}
					type:'pie', //柱形图
					// radius:['50%','70%'], 配置圆环
					roseType:'radius',

					data:[{
						value:1000,  //{c}
						name:'周一' //在折线的后面添加文字  {b}
					},{
						value:2000,
						name:'周二'
					},{
						value:1500,
						name:'周三'
					},{
						value:3000,
						name:'周四'
					},{
						value:1200,
						name:'周五'
					},{
						value:2000,
						name:'周六'
					},{
						value:800,
						name:'周日'
					}].sort((a,b)=>a.value-b.value)
				}
			]
		}
		return options
	}


	getOption3 = ()=>{
		let options = {
			title:{
				text:'饼图-3',
				textStyle:{
					color:'pink'
				},
				// x:'center'
			},
			legend: {//图例组件
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				icon:'circle',
				orient:'vertical',
				right:20,
				top:20,

			},
			tooltip: {  //提示框组件
				trigger: 'item',
				formatter:'{a}<br/>{b}:{c}({d}%)'
			},
			series:[
				{
					name:'存货',  //{a}
					type:'pie', //柱形图
					radius:['50%','70%'], //配置圆环
					// roseType:'radius',

					data:[{
						value:1000,  //{c}
						name:'周一' //在折线的后面添加文字  {b}
					},{
						value:2000,
						name:'周二'
					},{
						value:1500,
						name:'周三'
					},{
						value:3000,
						name:'周四'
					},{
						value:1200,
						name:'周五'
					},{
						value:2000,
						name:'周六'
					},{
						value:800,
						name:'周日'
					}]
				}
			]
		}
		return options
	}
	render() {
		return (
			<div>
				<Card>
					<ReactEcharts option={this.getOption1()} />
				</Card>
				<Card>
					<ReactEcharts option={this.getOption2()} />
				</Card>
				<Card>
					<ReactEcharts option={this.getOption3()} />
				</Card>
			</div>

		);
	}
}