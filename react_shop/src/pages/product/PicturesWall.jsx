import {Upload, Icon, Modal, message} from 'antd';
import React, {Component} from 'react';
import {reqDeleteImg} from  '../../api/index'
import C from '../../utils/Constant'
function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

class PicturesWall extends Component {
	constructor(props) {
		super(props)
		const {imgs} = this.props
		let fileList = []
		if (imgs) {
			fileList = imgs.map((item,index) => {
				return {
						uid: -index + '',
						name: item,
						status: 'done',
						url: C.BASE_URL+item,
				}
			})
		}
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList:fileList,
		}
	}
	getImgs = () => {
		return this.state.fileList.map(file=>file.name)
	}

	handleCancel = () => this.setState({previewVisible: false});

	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
		});
	};

	handleChange = async ({file, fileList}) => { // file是当前上传的文件,未添加到文件列表,done状态下才添加到文件列表
		if (file.status === 'done') { // 文件上传完成
			const {status, msg, data} = file.response
			if (status === 0) {
				message.success(msg);
				let currentFile = fileList[fileList.length - 1];
				currentFile.name = data.name;
				currentFile.url = data.url;
			}
		}else if (file.status === 'removed') { //删除后台的图片
			console.log("开始删除文件")
			console.log(file.name)
			const {status, msg} = await reqDeleteImg(file.name)
			if (status === 0) {
				message.success(msg)
			}
		}

		this.setState({fileList});

	}

	render() {
		const {previewVisible, previewImage, fileList} = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus"/>
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		return (
			<div className="clearfix">
				<Upload
					action="/img/upload"
					listType="picture-card" //上传的图片显示形式 textm=, picture, picture-card
					fileList={fileList}
					name="image"
					accept='image/*' // 接受所有类型的图片
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					multiple={true} // 多图片上传

				>
					{/*限制上传图片的数量*/}
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{width: '100%'}} src={previewImage}/>
				</Modal>
			</div>
		);
	}
}

export default PicturesWall