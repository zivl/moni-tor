import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button, Alert, Image} from 'react-native';
import HomeActions from './HomeActions';
import AppLogo from '../AppLogo/AppLogo';


const CheckIcon = () => {
	return (
		<View>
			<Image style={styles.image} source={require('../../resources/images/check_icon.png')}/>
		</View>
	)
};

const mapStateToProps = ({home}) => {

	return {
		user: home.user,
		isSeatAvailable: home.isSeatAvailable,
		hasRegisteredBefore: home.hasBeenRegistered,
		alreadyRegistered: home.alreadyRegistered
	}
};

const mapActionsToProps = (dispatch) => {

	return {
		onSeatReservation: user => HomeActions.reserveSeat(dispatch, user),
		checkQueue: user => HomeActions.checkQueue(dispatch, user)
	}
};

class HomeScreen extends Component {

	componentDidMount() {
		this.props.checkQueue(this.props.user);
	}

	render() {
		let {user, hasRegisteredBefore, onSeatReservation, alreadyRegistered} = this.props;
		let registerButtonColor = hasRegisteredBefore || alreadyRegistered ? registeredBeforeButtonColor : notRegisteredBeforeButtonColor;
		const message = hasRegisteredBefore || alreadyRegistered ? 'את רשומה בתור למוניטור,\nתקבלי הודעה לטלפון כשיגיע תורך' : '';

		return (
			<View style={styles.container}>
				<AppLogo style={{marginBottom: 50}}/>
				<View style={styles.textWrapper}>
					<Text style={styles.text}>{`היי ${user.fullName}`}</Text>
					<Text style={styles.text}>{message}</Text>
				</View>
				{(hasRegisteredBefore || alreadyRegistered) && <CheckIcon/>}
				<View style={styles.buttonWrapper}>
					<Button
						disabled={hasRegisteredBefore || alreadyRegistered}
						onPress={() => onSeatReservation(user)}
						title='הזמיני תור למוניטור'
						color={registerButtonColor}/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 50
	},
	text: {
		textAlign: 'right',
		fontSize: 22,
		fontWeight: 'bold',
		backgroundColor: 'transparent',
	},
	textWrapper: {
		width: '80%'
	},
	image: {
		width: 50,
		height: 50
	},
	buttonWrapper: {
		width: '80%',
		borderRadius: 5
	}

});

const notRegisteredBeforeButtonColor = 'crimson';
const registeredBeforeButtonColor = 'darkcyan';

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);