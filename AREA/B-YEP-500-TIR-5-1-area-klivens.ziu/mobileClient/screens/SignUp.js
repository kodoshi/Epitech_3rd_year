import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Loader from './Loader'



export default class Signup extends React.Component {

    state = {
        loading: false,
        userName: '',
        userEmail: '',
        userPassword: '',
        isRegistrationTrue: false,
        errortext: ''
    }


    handleSubmit = () => {

        const name = this.state.userName;
        const email = this.state.userEmail;
        const password = this.state.userPassword;



        this.setState({ loading: true });

        const user = {
            name,
            email,
            password,
          };

        const requestOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        fetch('http://192.168.0.12:8080/signup', requestOption)
            .then(response => response.json())
            .then(data => {

                this.setState({ loading: false })
            
                if (data.error)
                    this.setState({ errortext: user.error });
                else
                    this.setState({ isRegistrationTrue: true });
            })
            .catch((error) => {
                //Hide Loader
                alert(error)
                this.setState({ loading: false })
            });
    }

    render() {


        if (this.state.isRegistrationTrue) {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#307ecc',
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={require('../assets/success.png')}
                        style={{
                            height: 150,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                    />
                    <Text style={styles.successTextStyle}>
                        Registration Successful
                </Text>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.buttonTextStyle}>Login Now</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#307ecc' }}>

                <Loader loading={this.state.loading} />

                <ScrollView>

                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../assets/area.png')}
                            style={{
                                width: '50%',
                                height: 100,
                                resizeMode: 'contain',

                            }}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(e) => this.setState({ userName: e })}
                            underlineColorAndroid="#f000"
                            placeholder="User Name"
                            placeholderTextColor="#fff"
                            autoCapitalize="sentences"
                            returnKeyType="next"

                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(e) => this.setState({ userEmail: e })}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#fff"
                            keyboardType="email-address"
                            returnKeyType="next"

                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(e) => this.setState({ userPassword: e })}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#fff"
                            returnKeyType="next"
                            secureTextEntry={true}

                            blurOnSubmit={false}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={this.handleSubmit}
                    >
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        marginBottom: 20,
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
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});