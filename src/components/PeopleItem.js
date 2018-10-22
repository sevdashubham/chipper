import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {userFollow, userUnfollow, userFetchFollowing} from '../actions';
import {Button, CardSection} from './common';
import _ from "lodash";

class PeopleItem extends Component {

    onFollow() {
        const {uid, handle, name} = this.props.people.item;
        this.props.userFollow({uid, handle, name});
        this.props.userFetchFollowing();
    }
    onUnfollow() {
        const {uid, handle, name} = this.props.people.item;
        this.props.userUnfollow({uid, handle, name});
        this.props.userFetchFollowing();
    }

    render() {
        const {name} = this.props.people.item;

        return (
            <TouchableWithoutFeedback>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {name}
                        </Text>
                        <Button onPress={this.onFollow.bind(this)}>
                            Follow</Button>
                        <Button onPress={this.onUnfollow.bind(this)}>
                            Unfollow
                        </Button>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        color: "#000",
        fontSize: 18,
        paddingLeft: 15
    }
};
const mapStateToProps = state => {
    const following = state.following;
    return {following};

};
export default connect(mapStateToProps, {userFollow, userUnfollow, userFetchFollowing})(PeopleItem);
