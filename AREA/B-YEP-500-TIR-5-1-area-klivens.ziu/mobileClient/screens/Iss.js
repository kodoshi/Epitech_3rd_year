import React from 'react';
import { StyleSheet, Text, View, Image, Picker, Linking, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Header from '../shared/Header';
import RNPickerSelect from "react-native-picker-select";

import AsyncStorage from '@react-native-community/async-storage';
import { createastronaut } from './apiService';


export default class Iss extends React.Component {


    state = {
        action: 0,
        reaction: 0,
        actionlist: [
            { label: 'Receive ISS coords', value: 1 },
            { label: 'Receive ISS solar coords', value: 2 },
            { label: 'Receive ISS altitude + velocity stats', value: 3 }
        ],
        reactionlist: [
            { label: 'Send action info to an email', value: 4 }
        ],
        emailAddress: ''

    }

    componentDidMount() {
        this.astronautData = new FormData();
    }

    onAction = () => {
        if (this.state.action === 1) {

            this.astronautData.set("action_location", true);
            this.astronautData.set("action_solar_location", false);
            this.astronautData.set("action_other_stats", false);
        }
        else if (this.state.action === 2) {

            this.astronautData.set("action_location", false);
            this.astronautData.set("action_solar_location", true);
            this.astronautData.set("action_other_stats", false);
        }
        else if (this.state.action === 3) {

            this.astronautData.set("action_location", false);
            this.astronautData.set("action_solar_location", false);
            this.astronautData.set("action_other_stats", true);
        }
        else if (this.state.reaction === 4) {
            this.setState({ reaction_send_email: true });

            this.astronautData.set("reaction_send_email", true);
        }
    }

    createservice = async () => {
        //take the user id and token from the local storage

        let userId = await AsyncStorage.getItem('user');
        let token = await AsyncStorage.getItem('token');


        createastronaut(userId, token, this.astronautData);
        this.props.navigation.navigate('Home');
    }


    render() {
        return (

            <View style={{ display: 'flex', flex: 1 }}>

                <Header title='Iss' navigation={this.props.navigation} />

                <View style={styles.container}>

                    <Image style={{ height: 170, width: 300, marginTop: 20 }}
                        source={require('../images/iss.jpg')}
                    />

                    <View style={{ height: 50, width: 330, margin: 15 }}>
                        <TextInput
                            style={this.state.reaction === 4 ? styles.inputStyle : styles.hidde}
                            onChangeText={(e) => this.setState({ emailAddress: e })}
                            value={this.state.emailAddress}
                            placeholder="Add Email..."
                            keyboardType="email-address"
                        />

                    </View>


                    <Text style={{ margin: 20, fontSize: 20, fontWeight: 'bold', color: '#666' }}>Select an Action:</Text>

                    <View style={{ width: '80%' }}>
                        <RNPickerSelect

                            placeholder={{
                                label: 'Select an Action...',
                                value: null,
                            }}
                            onValueChange={(value) => { this.setState({ action: value }); this.onAction }}

                            items={this.state.actionlist}

                            style={{ ...pickerSelectStyles }}
                        />
                    </View>

                    <Text style={{ margin: 20, fontSize: 20, fontWeight: 'bold', color: '#666' }}>Select an Reaction:</Text>

                    <View style={{ width: '80%', marginBottom: 20 }}>
                        <RNPickerSelect

                            placeholder={{
                                label: 'Select an Reaction...',
                                value: null,
                            }}
                            onValueChange={(value) => this.setState({ reaction: value })}

                            items={this.state.reactionlist}

                            style={{ ...pickerSelectStyles }}
                        />

                    </View>

                    <Button
                        onPress={this.createservice}
                        title="Add new Service"
                        color="blue"

                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',

    },
    inputStyle: {
        flex: 1,
        color: 'blue',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'blue',
    },
    hidde: {
        width: 0,
        height: 0
    }
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',


    },
});