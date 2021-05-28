import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserManagment from './routes/UserManagment'
import DrawerNavigationRoutes from './routes/DrawerNavigationRoutes'

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>

        <Stack.Navigator initialRouteName="UserManagment">

          <Stack.Screen
            name="UserManagment"
            component={UserManagment}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
