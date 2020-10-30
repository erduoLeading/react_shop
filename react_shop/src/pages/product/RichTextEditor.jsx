import React, {Component} from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class RichTextEditor extends Component {

	constructor(props) {
		super(props);

		const details = this.props.details;
		if (details) { //如果有details 属性 （修改页面）
			const contentBlock = htmlToDraft(details);
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			this.state = {
				editorState,
			};
		}else{  //如果没有details属性  （添加页面）
			this.state = {
				editorState:EditorState.createEmpty(),
			};
		}
	}
	// state = {
	//     editorState: EditorState.createEmpty(),
	// }

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	// 提交给后台的数据
	getDetails = ()=>draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

	render() {

		const { editorState } = this.state;
		return (
			<div>
				<Editor
					editorState={editorState}
					editorStyle={{border:'1px solid #1DA57A',paddingLeft:20,height:200}} // 文本框样式
					wrapperClassName="demo-wrapper"
					editorClassName="demo-editor"
					onEditorStateChange={this.onEditorStateChange}
				/>
			</div>
		);
	}
}