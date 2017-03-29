import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, View, Text, StyleSheet, Button, PushNotificationIOS, Alert} from 'react-native';
import RegisterModelView from '../register/RegisterModalView';
import HomeActions from './HomeActions';
import Notifications from '../notifications/Notifications';


const mapStateToProps = ({home}) => {

    return {
        user: home.user,
        isSeatAvailable: home.isSeatAvailable,
        hasRegisteredBefore: home.hasBeenRegistered
    }
};

const mapActionsToProps = (dispatch) => {

    return {
        onSeatReservation: () => HomeActions.reserveSeat(dispatch)
    }
};

class HomeScreen extends Component {

	componentWillReceiveProps() {
		Alert.alert('componentWillReceiveProps');
	}

	componentWillUpdate(){
		Alert.alert('componentWillUpdate');
	}

	render() {
		let {user: {fullName}, isSeatAvailable, hasRegisteredBefore, onSeatReservation} = this.props;
		let availability = isSeatAvailable ? 'יש' : 'אין';
		let registerButtonColor = hasRegisteredBefore ? registeredBeforeButtonColor : notRegisteredBeforeButtonColor;
		return (
			<View style={styles.container}>
				<Notifications />
				<Image style={styles.bg} source={require('../register/bg.jpg')} />
				<RegisterModelView show={true}/>
				<View>
					<Text>{`היי ${fullName}`}</Text>
					<Text>{`כרגע ${availability} מקומות פנויים`}</Text>
				</View>
				<View>
					<Button
						onPress={() => onSeatReservation()}
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
    },
	bg: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		resizeMode: 'stretch',
	}
});

const notRegisteredBeforeButtonColor = 'crimson';
const registeredBeforeButtonColor = 'darkcyan';

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);