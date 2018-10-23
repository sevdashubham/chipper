import React, {Component} from 'react';
import {connect} from 'react-redux';
import {tweetCreate, tweetUpdate} from '../actions';
import {Card, CardSection, Button} from './common';
import TweetForm from './TweetForm';
import firebase from "firebase";

class TweetCreate extends Component {
    state = {
        handle: ''
    };
    componentDidMount() {
        this.getUserProfile();
    }

    onButtonPress() {
        const {text} = this.props;
        const {handle} = this.state;
        const timestamp = Math.floor((new Date()).getTime() / 1000);
        this.props.tweetCreate({handle, text, timestamp});
    }

    getUserProfile() {
        const {currentUser} = firebase.auth();
        firebase.database().ref(`/user_profiles/${currentUser.uid}`)
            .on('value', snapshot => {
                const user = snapshot.val();
                console.log(JSON.stringify(user));
                this.setState({
                    handle: user.handle
                });
            });
    }


    render() {
        return (
            <Card>
                <TweetForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Tweet
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const {text} = state.tweetForm;

    return {text};
};

export default connect(mapStateToProps, {
    tweetCreate, tweetUpdate
})(TweetCreate);
