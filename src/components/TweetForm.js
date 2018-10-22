import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { tweetCreate, tweetUpdate } from '../actions';
import { CardSection, Input } from './common';

class TweetForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Tweet"
                        placeholder="enter tweet here"
                        value={this.props.text}
                        onChangeText={value => this.props.tweetUpdate({ prop: 'text', value })}
                    />
                </CardSection>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    const { text } = state.tweetForm;
    return { text };
};

export default connect(mapStateToProps, { tweetCreate, tweetUpdate })(TweetForm);
