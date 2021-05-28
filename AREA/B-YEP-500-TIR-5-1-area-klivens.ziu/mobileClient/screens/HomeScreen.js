import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../shared/Header';
import Weather from './weather/Weather';

export default class HomeScreen extends React.Component {
    render() {
        return (

            <View style={{ display: 'flex', flex: 1 }}>
                <Header title='Home' navigation={this.props.navigation} />


                <View style={styles.container}>
                    <Weather></Weather>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
});
