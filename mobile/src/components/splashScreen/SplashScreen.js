import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AppLogo from '../AppLogo/AppLogo';

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppLogo />
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