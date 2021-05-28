import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// Imported Screens from Screen folder
import Login from '../screens/LogIn';
import Signup from '../screens/SignUp';


// Creating Stack Navigator
const Stack = createStackNavigator();


export default class UserManagment extends React.Component {

    render() {
        return (
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{
                        title: 'Signup', //Set Header Title
                        headerStyle: {
                            backgroundColor: '#307ecc', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}
                />
            </Stack.Navigator>
        );
    }
}
