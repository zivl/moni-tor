import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BackAndroid, Text, TouchableHighlight, View, TextInput, StyleSheet, Button, Alert, ScrollView} from 'react-native';
import RegisterActions from './RegisterActions';
import AppLogo from '../AppLogo/AppLogo';

const mapStateToProps = ({register, notifications}) => {
	const {token} = notifications;
	return {
		id: register.id,
		fullName: register.fullName,
		phone: register.phone,
		showError: register.showError,
		token
	}
};

const mapActionsToProps = (dispatch) => {
	return {
		onRegisterPress: userData => RegisterActions.registerNewUser(dispatch, {userData}),
		onInputChange: deltaData => RegisterActions.inputChange(dispatch, {deltaData})
	}
};

class RegisterView extends Component {

	render() {
		let {id, fullName, phone, onInputChange, onRegisterPress, showError, token} = this.props;
		if (showError) {
			Alert.alert('הרשמה נכשלה', 'נא לבדוק את הפרטים שהכנסת');
		}
		return (
			<View style={{marginTop: 22, flex: 1}}>
				<ScrollView style={styles.modalContent} keyboardDismissMode={'interactive'}>
					<AppLogo style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}/>
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
							onPress={() => {onRegisterPress({id, phone, fullName, token});}}
							title='הרשמה'
							disabled={token ? false : true}
							color={registerButtonColor}/>
					</View>
				</ScrollView>
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
		marginTop: 50,
		letterSpacing: 1.5,
		textAlign: 'right',
		color: '#1762fd',
		backgroundColor: 'transparent'
	},
	registerLabelT: {
		fontSize: 60,
		fontWeight: 'bold',
		marginTop: 50,
		letterSpacing: 1.5,
		textAlign: 'right',
		color: '#8762fd',
		backgroundColor: 'transparent'
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

export default connect(mapStateToProps, mapActionsToProps)(RegisterView);
