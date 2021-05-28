import React from 'react';
import { StyleSheet, Text, View, Tittle } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer, Title } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class DrawerContent extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...this.props}>


                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { this.props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { this.props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="bell"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Notification"
                            onPress={() => { this.props.navigation.navigate('Notifications') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="discord"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Discord"
                            onPress={() => { this.props.navigation.navigate('Discord') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="alien"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Iss"
                            onPress={() => { this.props.navigation.navigate('Iss') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="dog"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Joke"
                            onPress={() => { this.props.navigation.navigate('Joke') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="pirate"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Trade"
                            onPress={() => { this.props.navigation.navigate('Trade') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="pistol"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Norris"
                            onPress={() => { this.props.navigation.navigate('Norris') }}
                        />
                    </Drawer.Section>

                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign out"
                        onPress={() => { this.props.navigation.replace('UserManagment') }}
                    />
                </Drawer.Section>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfo: {

    },
    drawerSection: {

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    }
});
