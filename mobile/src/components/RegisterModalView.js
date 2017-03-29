import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, TextInput, StyleSheet, Button} from 'react-native';

export default class RegisterModalView extends Component {

	state = {
		modalVisible: true,
	};

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View style={{marginTop: 22}}>
				<Modal
					animationType={'slide'}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {alert('Modal has been closed.')}}>
					<View style={styles.modalContent}>
						<TextInput
							style={styles.textInput}
							placeholder={'שם מלא'}
							placeholderTextColor={placeholderTextColor}/>
						<TextInput style={styles.textInput} placeholder={'תעודת זהות'} placeholderTextColor={placeholderTextColor}/>
						<TextInput style={styles.textInput} placeholder={'טלפון'} placeholderTextColor={placeholderTextColor}/>
						<View>
							<Button
								onPress={() => this.setModalVisible(!this.state.modalVisible)}
								title='הרשמה'
								color={registerButtonColor}/>
						</View>
					</View>
				</Modal>

				<TouchableHighlight onPress={() => this.setModalVisible(true)}>
					<Text>Show Modal</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const placeholderTextColor = 'hotpink';
const registerButtonColor = '#841584';
const styles = StyleSheet.create({
	modalContent: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		marginTop: 22
	},
	textInput: {
		height: 30,
		borderColor: 'gray',
		borderWidth: 1
	}

});