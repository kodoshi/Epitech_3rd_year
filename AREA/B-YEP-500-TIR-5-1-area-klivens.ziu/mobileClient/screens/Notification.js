import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { listlogs } from './apiUsers';

import AsyncStorage from '@react-native-community/async-storage';

import Header from '../shared/Header'

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logs: [],
        };
    }

    /**
     * Handle the response object from listpost method
     * if no error set State with data and display post information in the right form
     * if error console log the err.
     */

    createNot = async () => {

        let userId = await AsyncStorage.getItem('user');

        listlogs(userId).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else this.setState({ logs: data });
        });
        //   setInterval(() => this.setState({ time: Date.now() }), 1000); //refreshing every second */
    }

    componentDidMount() {

        this.createNot();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (

            <View>
                <Header title='Notification' navigation={this.props.navigation} />

                <View style={styles.container}>

                    <View>


                        <View>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>Logs:</Text>
                            <View style={{ borderWidth: 1, borderColor: '#444', height: 400, justifyContent: 'center', width: 400, alignItems: 'center', borderRadius: 20 }}>
                                {this.state.logs.map(txt => <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#666', marginBottom: 10 }}>{txt} </Text>)}
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50
    },
});
