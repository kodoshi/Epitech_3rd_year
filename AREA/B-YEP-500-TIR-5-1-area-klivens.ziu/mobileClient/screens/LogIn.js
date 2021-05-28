import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Loader from './Loader'
import AsyncStorage from '@react-native-community/async-storage';


export default class Login extends React.Component {

    state = {
        loading: false,
        userEmail: '',
        userPassword: '',
        errortext: ''
    }

    handleSubmit = () => {

        this.setState({ errortext: '' })

        const email = this.state.userEmail;
        const password = this.state.userPassword;

        if (!this.state.userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!this.state.userPassword) {
            alert('Please fill Email');
            return;
        }

        this.setState({ loading: true });
        const requestOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password })
        };

        fetch('http://192.168.0.12:8080/signin', requestOption)
            .then(response => response.json())
            .then(user => {

                this.setState({ loading: false });

                if (user.token) {
                    AsyncStorage.setItem('token', user.token);
                    AsyncStorage.setItem('user', user.user._id);
                    
                    this.props.navigation.replace('DrawerNavigationRoutes');
                }
                else {
                    this.setState({ errortext: user.error });
                }

            })
            .catch((error) => {
                //Hide Loader
                alert(error)
            });

    }

    render() {
        return (
            <View style={styles.mainBody}>

                <Loader loading={this.state.loading} />

                <ScrollView>
                    <View>

                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../assets/area.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                    marginTop: 50
                                }}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => this.setState({ userEmail: e })}
                                placeholder="Enter Email"
                                placeholderTextColor="#fff"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                        

                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => this.setState({ userPassword: e })}
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#fff"
                                keyboardType="default"
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>

                        {this.state.errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {this.state.errortext}
                            </Text>
                        ) : null}

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={this.handleSubmit}
                        >
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => this.props.navigation.navigate('Signup')}>
                            New Here ? Register
              </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
