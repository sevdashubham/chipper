import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tweetCreate, tweetUpdate } from '../actions';
import { Card, CardSection, Button } from './common';
import TweetForm from './TweetForm';

class TweetCreate extends Component {
    onButtonPress() {
        const { text } = this.props;
        const timestamp = Math.floor((new Date()).getTime() / 1000);
        this.props.tweetCreate({ text, timestamp });
    }

    render() {
        return (
            <Card>
                <TweetForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
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
