import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Drawer, Title } from 'react-native-paper'



import Header from '../shared/Header'
import { color } from 'react-native-reanimated';

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={{ display: 'flex', flex: 1 }}>
                <Header title='Profile' navigation={this.props.navigation} />
                <View style={styles.container}>
                    <View style={styles.elements}>
                        <Text style={styles.headerText}>UserName :</Text>
                        <Text style={styles.rightText}>Geraldo</Text>
                    </View>

                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />

                    <View style={styles.elements}>
                        <Text style={styles.headerText}>Email :</Text>
                        <Text style={styles.rightText}>Geraldo.hysa@hotmail.com</Text>
                    </View>

                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />

                    <View style={styles.elements}>
                        <Text style={styles.headerText}>Password :</Text>
                        <Text style={styles.rightText}>*********</Text>
                    </View>

                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />

                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="exit-to-app"
                                    color={ '#fff'}
                                    size={size}
                                />
                            )}
                            
                            label="Sign out"
                        
                        
                            onPress={() => { this.props.navigation.replace('UserManagment') }}
                        />
                    </Drawer.Section>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 360,
        top: 50,
    },
    elements: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20
    },
    headerText: {
        color: '#888',
        fontWeight: 'bold'
    },
    rightText: {
        position: 'absolute',
        left: 130,
        color: '#444',
        fontWeight: 'bold'
    },
    bottomDrawerSection: {
        margin: 80,
        borderTopColor: '#444',
        borderTopWidth: 1,
        backgroundColor: '#307ecc'
    }
});
