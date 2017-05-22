import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button, PushNotificationIOS, Alert} from 'react-native';
import HomeActions from './HomeActions';
import AppLogo from '../AppLogo/AppLogo';

const mapStateToProps = ({home}) => {

    return {
        user: home.user,
        isSeatAvailable: home.isSeatAvailable,
        hasRegisteredBefore: home.hasBeenRegistered
    }
};

const mapActionsToProps = (dispatch) => {

    return {
        onSeatReservation: user => HomeActions.reserveSeat(dispatch, user)
    }
};

class HomeScreen extends Component {

	componentWillReceiveProps() {
	}

	componentWillUpdate(){
	}

	render() {
		let {user, isSeatAvailable, hasRegisteredBefore, onSeatReservation} = this.props;
		let availability = isSeatAvailable ? 'יש' : 'אין';
		let registerButtonColor = hasRegisteredBefore ? registeredBeforeButtonColor : notRegisteredBeforeButtonColor;
		return (
			<View style={styles.container}>
				<AppLogo style={{marginBottom: 50}}/>
				<View>
					<Text>{`היי ${user.fullName}`}</Text>
					<Text>{`כרגע ${availability} מקומות פנויים`}</Text>
				</View>
				<View>
					<Button
						onPress={() => onSeatReservation(user)}
						title='שרייני מקום'
						color={registerButtonColor}/>
				</View>
			</View>
		);
	}


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

const notRegisteredBeforeButtonColor = 'crimson';
const registeredBeforeButtonColor = 'darkcyan';

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);