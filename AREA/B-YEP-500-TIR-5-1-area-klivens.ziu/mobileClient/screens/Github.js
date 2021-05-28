import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class Github extends React.Component {
    render() {
        return (

            <View style={{ display: 'flex', flex: 1}}>
                <View style={styles.container}>
                    <Text>Github in</Text>
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
        justifyContent: 'center'
    },
});
