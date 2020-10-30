import React, {Component} from 'react';
import {Card, Button} from 'antd'


import ReactEcharts from 'echarts-for-react';
import * as echarts from "echarts"

var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
var yMax = 500;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
	dataShadow.push(yMax);
}
class Bar extends Component {
	state = {
		books:[1000,2000,1500,3000,2000,1200,800],//预订量
		sales:[800,1500,1300,2800,1500,1000,500],   //销量
	}
	getOption1 = () => {
		let option1 = {
			title: {
				// text: '',
				subtext: '特性示例：渐变色 阴影 点击缩放'
			},
			legend: {
				data: ['存货'],
				icon:'circle'
			},
			tooltip: {
				trigger: "axis", //item移动到有数据项图形触发处显示提示 axis坐标轴触发
			},
			xAxis: {
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],//x轴刻度数据
				axisLabel: {
					inside: true,
					textStyle: {
						color: '#fff'
					}
				},
				axisTick: {
					show: false // 是否显示刻度
				},
				axisLine: {
					show: false //是否显示底线x轴
				},
				z:10 // 刻度值向z轴平移的距离
			},
			yAxis: {
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#999'
					}
				},
				// splitLine: {
				// 	show: false //图形区域的中y轴刻度分割线是否显示
				// }
			},
			dataZoom: [
				{
					type: 'inside'
				}
			],
			series: [
				{ // For shadow
					type: 'bar',
					itemStyle: {
						color: 'rgba(0,0,0,0.05)'
					},
					barGap: '-100%',
					barCategoryGap: '40%',
					data: dataShadow,
					animation: false
				},
				{
					type: 'bar',
					itemStyle: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: '#83bff6'},
								{offset: 0.5, color: '#188df0'},
								{offset: 1, color: '#188df0'}
							]
						)
					},
					emphasis: {
						itemStyle: {
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1,
								[
									{offset: 0, color: '#2378f7'},
									{offset: 0.7, color: '#2378f7'},
									{offset: 1, color: '#83bff6'}
								]
							)
						}
					},
					data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220],
					name: '存货',
				}
			]
		};
		return option1
	}
	getOption2 = (books,sales)=>{
		let options = {
			title:{
				text:'柱形图-2',
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
					type:'bar', //柱形图
					data:books
				},
				{
					name:'销量',
					type:'bar', //柱形图
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
				<Card >
					<ReactEcharts
						option={this.getOption1()}
						notMerge={true}
						lazyUpdate={true}
						theme={"theme_name"}
						// onChartReady={this.onChartReadyCallback}
						// onEvents={EventsDict}
					/>
				</Card>
				<Card title={title}>
					<ReactEcharts
						option={this.getOption2(books,sales)}
					/>
				</Card>
			</div>

		);
	}
}

export default Bar;