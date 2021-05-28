import * as React from 'react';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';



import DrawerContent from '../screens/DrawerContent';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Subscriptions from '../screens/Subscriptions';
import Notifications from '../screens/Notification';
import Discord from '../screens/Discord';
import Iss from '../screens/Iss';
import Joke from '../screens/Jooke';
import Trade from '../screens/Trade';
import Norris from '../screens/Norris';


// Creating Drawer Navigation
const Drawer = createDrawerNavigator();


export default function DrawerNavigatorRoutes() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {... props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Subscriptions" component={Subscriptions} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Discord" component={Discord} />
      <Drawer.Screen name="Iss" component={Iss} />
      <Drawer.Screen name="Joke" component={Joke} />
      <Drawer.Screen name="Trade" component={Trade} />
      <Drawer.Screen name="Norris" component={Norris} />


    </Drawer.Navigator>
  );
}