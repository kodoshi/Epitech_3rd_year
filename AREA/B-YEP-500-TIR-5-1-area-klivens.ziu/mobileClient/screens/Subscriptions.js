import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


import Header from '../shared/Header'

export default class Subsciptions extends React.Component {

    state = {
        loading: false,
        discord: false,
        facebook: false,
        google: false,
        github: false
    }




    render() {
        return (

            <View style={{ display: 'flex', flex: 1 }}>
                <Header title='Subscriptions' navigation={this.props.navigation} />
                <View style={styles.container}>
                    <View style={styles.subscribe}>
                        <Text style={styles.subscribeText}>Discord</Text>
                        <Switch
                            value={this.state.discord}
                            onValueChange={(value) => this.setState({ discord: value })} />
                    </View>

                    <View style={styles.subscribe}>
                        <Text style={styles.subscribeText}>Github</Text>
                        <Switch
                            value={this.state.github}
                            onValueChange={(value) => this.setState({ github: value })}
                        />
                    </View>

                    <View style={styles.subscribe}>
                        <Text style={styles.subscribeText}>Facebook</Text>
                        <Switch
                            value={this.state.facebook}
                            onValueChange={(value) => this.setState({ facebook: value })}
                        />

                    </View>

                    <View style={styles.subscribe}>
                        <Text style={styles.subscribeText}>Google</Text>
                        <Switch
                            value={this.state.google}
                            onValueChange={(value) => this.setState({ google: value })}
                        />

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
    subscribe: {
        marginTop: 60,
        marginLeft: 50,
        marginRight: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subscribeText: {
        fontSize: 20,
        color: '#307ecc',
        fontWeight: 'bold'
    }

});
