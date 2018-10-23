import React from 'react'
import {StyleSheet, Text, TextInput, View, Button} from 'react-native'
import {auth} from "../config/firebase";
import firebase from 'firebase';
import {Actions} from "react-native-router-flux";


export default class SignUp extends React.Component {
    state = {email: '', password: '', handle: '', name: '', errorMessage: null};

    handleSignUp = () => {
        const {email, password, handle, name} = this.state;
        auth.createUserWithEmailAndPassword(email, password)
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
                {this.state.errorMessage &&
                <Text style={{color: 'red', padding: 5}}>
                    {this.state.errorMessage}
                </Text>}
                <Button title="Sign Up" onPress={this.handleSignUp}/>
                <Button
                    title="Already have an account? Login"
                    onPress={() => Actions.auth()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        padding: 5
    }
});
