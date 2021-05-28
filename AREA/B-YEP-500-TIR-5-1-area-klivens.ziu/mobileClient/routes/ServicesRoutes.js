import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// Imported Screens from Screen folder
import Discord from '../screens/Discord';
import Github from '../screens/Github';


// Creating Stack Navigator
const Stack = createStackNavigator();


export default class UserManagment extends React.Component {

    render() {
        return (
            <Stack.Navigator initialRouteName={this.props.na}>
                <Stack.Screen
                    name="Discord"
                    component={Discord}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Github"
                    component={Github}
                    options={{
                        title: 'Github', //Set Header Title
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
