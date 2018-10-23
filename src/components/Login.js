import React from 'react'
import {StyleSheet, Text, TextInput, View, Button, Image, AsyncStorage} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {auth} from "../config/firebase";
import firebase from 'firebase';
import {userFetchFollowing} from "../actions";
import {connect} from "react-redux";

class Login extends React.Component {
    state = {email: '', password: '', errorMessage: null};

    handleLogin = () => {
        const {email, password} = this.state;
        auth
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.props.userFetchFollowing();
                const {currentUser} = firebase.auth();
                firebase.database().ref(`/user_profiles/${currentUser.uid}`)
                    .once('value').then(snapshot => {
                        console.log(JSON.stringify(snapshot.val()));
                        this.storeUser(JSON.stringify(snapshot.val()));
                    });
                Actions.main();
            })
            .catch(error => this.setState({errorMessage: error.message}))
    };
    async storeUser(user) {
        try {
            await AsyncStorage.setItem('userProfile', user);
        } catch (error) {
            // Error saving data
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require('../assets/chipper.jpg')}/>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />
                {this.state.errorMessage &&
                <Text style={{color: 'red', padding: 5}}>
                    {this.state.errorMessage}
                </Text>}
                <Button title="Login" onPress={this.handleLogin}/>
                <Button
                    title="Don't have an account? Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    const following = state.following;
    return {following};

};

export default connect(mapStateToProps, {userFetchFollowing})(Login);

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 150
    },
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
