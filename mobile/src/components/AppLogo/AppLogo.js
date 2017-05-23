import React, {Component} from 'react';
import {View, Image} from 'react-native';

export default class AppLogo extends Component {
	render() {
		let style = this.props.style ? this.props.style : {};
		return (
			<View style={style}>
				<Image source={require('../../resources/images/monitor-logo.png')} transform={[{scale: 0.7}]}/>
			</View>
		)
	}
}