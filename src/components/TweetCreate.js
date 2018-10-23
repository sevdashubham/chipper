import React, { Component } from 'react';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';
import { tweetCreate, tweetUpdate } from '../actions';
import { Card, CardSection, Button } from './common';
import TweetForm from './TweetForm';

class TweetCreate extends Component {
    onButtonPress() {
        const { text } = this.props;
        const timestamp = Math.floor((new Date()).getTime() / 1000);
        this.getUserProfile().then((user) =>{
            const handle = user.handle;
                this.props.tweetCreate({handle, text, timestamp })}
        );

    }
async getUserProfile() {
    try {
        const value = await AsyncStorage.getItem('userProfile');
        if (value !== null) {
            // We have data!!
            return JSON.parse(value);
        }
    } catch (error) {
        // Error retrieving data
    }
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
    const { text } = state.tweetForm;

    return { text };
};

export default connect(mapStateToProps, {
    tweetCreate, tweetUpdate
})(TweetCreate);
