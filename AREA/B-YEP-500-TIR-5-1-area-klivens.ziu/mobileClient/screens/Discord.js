import React from 'react';
import { StyleSheet, Text, View, Image, Picker, Linking, TextInput } from 'react-native';
import { Button } from 'react-native-elements';


import Header from '../shared/Header';
import RNPickerSelect from "react-native-picker-select";

import AsyncStorage from '@react-native-community/async-storage';
import { creatediscord } from "./apiService.js";




export default class Discord extends React.Component {


    state = {
        action: 0,
        reaction: 0,
        actionlist: [
            { label: 'Receive new message', value: 1 },
            { label: 'Receive new user info', value: 2 },
            { label: 'Receive new channel info', value: 3 },
            { label: 'Receive banned user info', value: 8 },
            { label: 'Receive kicked user info', value: 9 },
        ],
        reactionlist: [
            { label: 'Create new text channel', value: 5 },
            { label: 'Send an email', value: 6 },
            { label: 'Create new voice channel', value: 7 },
        ],
        userId: '',
        emailAddress: ''
    }



    onAction = () => {
        if (this.state.action === 1) {

            this.discordData.set("action_new_message", true);
            this.discordData.set("action_user_joins", false);
            this.discordData.set("action_new_channel", false);
            this.discordData.set("action_user_banned", false);
            this.discordData.set("action_user_kicked", false);
        }
        else if (this.state.action === 2) {

            this.discordData.set("action_new_message", false);
            this.discordData.set("action_user_joins", true);
            this.discordData.set("action_new_channel", false);
            this.discordData.set("action_user_banned", false);
            this.discordData.set("action_user_kicked", false);
        }
        else if (this.state.action === 3) {

            this.discordData.set("action_new_message", false);
            this.discordData.set("action_user_joins", false);
            this.discordData.set("action_new_channel", true);
            this.discordData.set("action_user_banned", false);
            this.discordData.set("action_user_kicked", false);
        }
        else if (this.state.action === 8) {

            this.discordData.set("action_new_message", false);
            this.discordData.set("action_user_joins", false);
            this.discordData.set("action_new_channel", false);
            this.discordData.set("action_user_banned", true);
            this.discordData.set("action_user_kicked", false);
        }

        else if (this.state.action === 9) {

            this.discordData.set("action_new_message", false);
            this.discordData.set("action_user_joins", false);
            this.discordData.set("action_new_channel", false);
            this.discordData.set("action_user_banned", false);
            this.discordData.set("action_user_kicked", true);
        }

        else if (this.state.reaction === 5) {

            this.discordData.set("reaction_create_channel", true);
            this.discordData.set("reaction_send_email", false);
            this.discordData.set("reaction_create_voice_channel", false);
        }
        else if (this.state.reaction === 6) {

            this.discordData.set("reaction_create_channel", false);
            this.discordData.set("reaction_send_email", true);
            this.discordData.set("reaction_create_voice_channel", false);
        }
        else if (this.state.reaction === 7) {

            this.discordData.set("reaction_create_channel", false);
            this.discordData.set("reaction_send_email", false);
            this.discordData.set("reaction_create_voice_channel", true);
        }
    }


    componentDidMount() {
        this.discordData = new FormData();
    }

    createservice = async () => {
        //take the user id and token from the local storage

        let userId = await AsyncStorage.getItem('user');
        let token = await AsyncStorage.getItem('token');

        creatediscord(userId, token, this.discordData);
        this.props.navigation.navigate('Home');
    }



    render() {
        return (

            <View style={{ display: 'flex', flex: 1 }}>

                <Header title='Discord' navigation={this.props.navigation} />

                <View style={styles.container}> 

                    <Image style={{ height: 170, width: 300, marginTop: 20 }}
                        source={require('../images/discord_default.jpg')}
                    />
                    <View style={{ height: 50, width: 330,marginTop: 5 }}>
                        <TextInput
                            style={this.state.reaction === 6 || this.state.reaction === 7 || this.state.reaction === 5 ? styles.inputStyle : styles.hidde}
                            onChangeText={(e) => this.setState({ emailAddress: e })}
                            value={this.state.emailAddress}
                            placeholder="Add Text..."
                            keyboardType="email-address"
                        />

                    </View>
                    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold', color: 'blue' }}
                        onPress={() => Linking.openURL('https://discordapp.com/api/oauth2/authorize?client_id=814654650593706026&permissions=4228906231&scope=bot')}>
                        First Time Authorization
                    </Text>

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
                            onValueChange={(value) => { this.setState({ reaction: value }); this.onAction }}

                            items={this.state.reactionlist}

                            style={{ ...pickerSelectStyles }}
                        />

                    </View>

                    <Button
                        title="Add new Service"
                        color="blue"
                        onPress={this.createservice}
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