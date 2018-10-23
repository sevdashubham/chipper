import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {tweetCreate, tweetUpdate} from '../actions';
import {CardSection} from './common';

class TweetForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <TextInput style={styles.input}
                               multiline={true}
                               numberOfLines={4}
                               maxLength={140}
                               label="Tweet"
                               placeholder="What's cooking!"
                               value={this.props.text}
                               onChangeText={value => this.props.tweetUpdate({prop: 'text', value})}
                    />
                </CardSection>
            </View>
        );
    }
}

const styles = {
    input: {
        height: 200
    }
};

const mapStateToProps = (state) => {
    const {text} = state.tweetForm;
    return {text};
};

export default connect(mapStateToProps, {tweetCreate, tweetUpdate})(TweetForm);
