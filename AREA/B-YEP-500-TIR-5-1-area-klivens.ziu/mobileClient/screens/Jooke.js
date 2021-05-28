import React from 'react';
import { StyleSheet, Text, View, Image, Picker, Linking, TextInput } from 'react-native';
import { Button } from 'react-native-elements';


import Header from '../shared/Header';
import RNPickerSelect from "react-native-picker-select";

import AsyncStorage from '@react-native-community/async-storage';

import { createjoke } from './apiService';


export default class Jooke extends React.Component {


    state = {
        action: 0,
        reaction: 0,
        actionlist: [
            { label: 'Receive a french joke', value: 1 },
            { label: 'Receive an english joke', value: 2 },
            { label: 'Receive a programming joke', value: 3 },
            { label: 'Receive a christmas joke', value: 4 }
        ],
        reactionlist: [
            { label: 'Send action info to an email', value: 5 }
        ],
        emailAddress: ''

    }

    isAuthenticated = () => {

        if (AsyncStorage.getItem("token")) {
            return JSON.parse(localStorage.getItem("token"));
        } else {
            return false;
        }
    };


    onAction = () => {
        if (this.state.action === 1) {
            this.setState({ action_french_joke: true });
            this.setState({ action_english_joke: false });
            this.setState({ action_programming_joke: false });
            this.setState({ action_christmas_joke: false });

            this.jokeData.set("action_french_joke", true);
            this.jokeData.set("action_english_joke", false);
            this.jokeData.set("action_programming_joke", false);
            this.jokeData.set("action_christmas_joke", false);
        }
        else if (this.state.action === 2) {
            this.setState({ action_french_joke: false });
            this.setState({ action_english_joke: true });
            this.setState({ action_programming_joke: false });
            this.setState({ action_christmas_joke: false });

            this.jokeData.set("action_french_joke", false);
            this.jokeData.set("action_english_joke", true);
            this.jokeData.set("action_programming_joke", false);
            this.jokeData.set("action_christmas_joke", false);
        }
        else if (this.state.action === 3) {
            this.setState({ action_french_joke: false });
            this.setState({ action_english_joke: false });
            this.setState({ action_programming_joke: true });
            this.setState({ action_christmas_joke: false });

            this.jokeData.set("action_french_joke", false);
            this.jokeData.set("action_english_joke", false);
            this.jokeData.set("action_programming_joke", true);
            this.jokeData.set("action_christmas_joke", false);
        }
        else if (this.state.action === 4) {
            this.setState({ action_french_joke: false });
            this.setState({ action_english_joke: false });
            this.setState({ action_programming_joke: false });
            this.setState({ action_christmas_joke: true });

            this.jokeData.set("action_french_joke", false);
            this.jokeData.set("action_english_joke", false);
            this.jokeData.set("action_programming_joke", false);
            this.jokeData.set("action_christmas_joke", true);
        }

        else if (this.state.reaction === 5) {
            this.setState({ reaction_send_email: true });

            this.jokeData.set("reaction_send_email", true);
        }
    }


    createservice = async () => {
        //take the user id and token from the local storage

        let userId = await AsyncStorage.getItem('user');
        let token = await AsyncStorage.getItem('token');


        createjoke(userId, token, this.tradeData);
        this.props.navigation.navigate('Home');
    }



    render() {
        return (

            <View style={{ display: 'flex', flex: 1 }}>

                <Header title='Joke' navigation={this.props.navigation} />

                <View style={styles.container}>

                    <Image style={{ height: 170, width: 300, marginTop: 20 }}
                        source={require('../images/joke_default.png')}
                    />

                    <View style={{ height: 50, width: 330, margin: 15 }}>
                        <TextInput
                            style={this.state.reaction === 5 ? styles.inputStyle : styles.hidde}
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