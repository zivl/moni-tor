import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Modal, Text, TouchableHighlight, View, TextInput, StyleSheet, Button, Alert, ScrollView} from 'react-native';
import RegisterActions from './RegisterActions';

const mapStateToProps = ({register}) => {

	return {
		id: register.id,
		fullName: register.fullName,
		phone: register.phone,
		showModal: register.showModal,
		showError: register.showError
	}
};

const mapActionsToProps = (dispatch) => {
	return {
		onRegisterPress: userData => RegisterActions.registerNewUser(dispatch, {userData}),
		onInputChange: deltaData => RegisterActions.inputChange(dispatch, {deltaData})
	}
};

class RegisterModalView extends Component {

	render() {
		let {id, fullName, phone, showModal, onInputChange, onRegisterPress, showError} = this.props;
		if (showError) {
			Alert.alert('הרשמה נכשלה', 'נא לבדוק את הפרטים שהכנסת');
		}
		return (
			<View style={{marginTop: 22}}>
				<Modal
					animationType={'slide'}
					transparent={false}
					visible={showModal}
					onRequestClose={() => {alert('Modal has been closed.')}}>
					<ScrollView style={styles.modalContent} keyboardDismissMode={'interactive'}>
						<Text style={styles.registerLabel}>{'הרשמה'}</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'שם מלא'}
							placeholderTextColor={placeholderTextColor}
							value={fullName}
							onChangeText={fullName => onInputChange({fullName})}/>
						<TextInput
							keyboardType={'numeric'}
							style={styles.textInput}
							placeholder={'תעודת זהות'}
							placeholderTextColor={placeholderTextColor}
							value={id}
							onChangeText={id => onInputChange({id})}/>
						<TextInput
							keyboardType={'phone-pad'}
							style={styles.textInput}
							placeholder={'טלפון'}
							placeholderTextColor={placeholderTextColor}
							value={phone}
							onChangeText={phone => onInputChange({phone})}/>
						<View style={styles.buttonWrapper}>
							<Button
								onPress={() => onRegisterPress({id, phone, fullName})}
								title='הרשמה'
								color={registerButtonColor}/>
						</View>
					</ScrollView>
				</Modal>
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
		margin: 22
	},
	registerLabel: {
		fontSize: 60,
		fontWeight: 'bold',
		lineHeight: 0.8,
		letterSpacing: 1.5,
		textAlign: 'right',
		color: '#8762fd',
	},
	textInput: {
		marginTop: 50,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 10,
		textAlign: 'right'
	},
	buttonWrapper: {
		marginTop: 20
	}

});

export default connect(mapStateToProps, mapActionsToProps)(RegisterModalView);
