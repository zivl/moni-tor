import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button, PushNotificationIOS, Alert, Image} from 'react-native';
import HomeActions from './HomeActions';
import AppLogo from '../AppLogo/AppLogo';


const CheckIcon = () => {
	return (
		<View>
			<Image style={styles.image} source={require('../../resources/images/check_icon.png')} />
		</View>
	)
}

const mapStateToProps = ({home}) => {
	
    return {
        user: home.user,
        isSeatAvailable: home.isSeatAvailable,
        hasRegisteredBefore: home.hasBeenRegistered,
		allreadyRegistred: home.allreadyRegistred
    }
};

const mapActionsToProps = (dispatch) => {

    return {
        onSeatReservation: user => HomeActions.reserveSeat(dispatch, user),
		checkQueue: user => HomeActions.checkQueue(dispatch, user)
    }
};

class HomeScreen extends Component {

	componentWillReceiveProps() {

	}

	componentDidMount() {
		this.props.checkQueue(this.props.user);
	}

	componentWillUpdate(){
	}
 

	render() {
		let {user, isSeatAvailable, hasRegisteredBefore, onSeatReservation, allreadyRegistred} = this.props;
		let availability = isSeatAvailable ? 'יש' : 'אין';
		let registerButtonColor = hasRegisteredBefore || allreadyRegistred ? registeredBeforeButtonColor : notRegisteredBeforeButtonColor;
		const message = hasRegisteredBefore || allreadyRegistred ? 'הינך נמצאת בתור,\nתישלח אלייך הודעה ברגע שיתפנה מוניטור' : '\n\n';

		return (
			<View style={styles.container}>
				<AppLogo style={{marginBottom: 50}}/>
				<View>
					<Text style={styles.text}>{`היי ${user.fullName}`}</Text>
					<Text style={styles.text}>{message}</Text>
				</View>
				{(hasRegisteredBefore || allreadyRegistred) && <CheckIcon/>}
				<View>				
					<Button
						disabled={hasRegisteredBefore || allreadyRegistred}
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
        alignItems: 'center'        
    },
	text: {
		textAlign: 'center'
  	},
	image: {
		width: 50,
		height: 50
	} 

});

const notRegisteredBeforeButtonColor = 'crimson';
const registeredBeforeButtonColor = 'darkcyan';

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);