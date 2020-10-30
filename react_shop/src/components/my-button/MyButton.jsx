import React, {Component} from 'react';
import './myButton.less'
class MyButton extends Component {

	render() {
		return (
				<button className='my-button'
						onClick={this.props.handleClick}>
					{this.props.children}
				</button>
		);
	}
}

export default MyButton;