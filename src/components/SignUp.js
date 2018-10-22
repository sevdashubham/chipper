import React from 'react'
import {StyleSheet, Text, TextInput, View, Button} from 'react-native'
import {auth} from "../config/firebase";
import {colors} from '../utils/constants';
import firebase from 'firebase';
import {Actions} from "react-native-router-flux";


export default class SignUp extends React.Component {
    state = {email: '', password: '', handle: '', name: '', errorMessage: null};

    handleSignUp = () => {
        const {email, password, handle, name} = this.state;

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                if (data.user) {
                    console.log(data.user.uid);
                    this.updateDetails(data.user.uid, handle, name, data.user.email);
                }
            })
            .catch(error => this.setState({errorMessage: error.message}))

    };

    updateDetails(uid, handle, name, email) {
        firebase.database().ref(`/user_profiles`).child(uid)
            .set({handle, name, email})
            .then(() => {
                Actions.main();
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                <Text style={{color: 'red'}}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />
                <TextInput
                    placeholder="Handle"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={handle => this.setState({handle})}
                    value={this.state.handle}
                />
                <TextInput
                    placeholder="Name"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                />

                <Button title="Sign Up" onPress={this.handleSignUp}/>
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: colors.PRIMARY,
        borderWidth: 1,
        marginTop: 8
    }
});
