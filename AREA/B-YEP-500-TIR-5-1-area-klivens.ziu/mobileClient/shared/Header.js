import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header( { navigation, title }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            <View>
                <Text style={styles.headerText}>{ title }</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    header: {
        height: 65,
        backgroundColor: '#307ecc',
        flexDirection: 'row',
        
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 1,
        top: 30
    },
    icon: {      
        color: '#fff',
        position: 'absolute',
        left: 30,
        top: 30
    }
});
