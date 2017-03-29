import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button} from 'react-native';
import RegisterModelView from '../register/RegisterModalView';
import HomeActions from './HomeActions';

const mapStateToProps = ({home}) => {

	return {
		user: home.user,
		isSeatAvailable: home.isSeatAvailable
	}
};

const mapActionsToProps = (dispatch) => {

	return {
		onSeatReservation: () => HomeActions.reserveSeat(dispatch)
	}
};

class HomeScreen extends Component {

	render() {
		let {user: {fullName}, isSeatAvailable} = this.props;
		let availability = isSeatAvailable ? 'יש' : 'אין';
		return (
			<View style={styles.container}>
				<RegisterModelView />
				<View>
					<Text>{`היי ${fullName}`}</Text>
					<Text>{`כרגע ${availability} מקומות פנויים`}</Text>
				</View>
				<View>
					<Button></Button>
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

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);