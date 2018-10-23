import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {userFollow, userUnfollow, userFetchFollowing} from '../actions';
import {Actions} from "react-native-router-flux";
import {colors} from '../utils/constants';

class PeopleItem extends Component {

    componentDidMount() {
        console.log(this.props.following);
    }

    onFollow() {
        const {uid, handle, name} = this.props.people.item;
        this.props.userFollow({uid, handle, name});
    }

    onUnfollow() {
        const {uid, handle, name} = this.props.people.item;
        this.props.userUnfollow({uid, handle, name});
    }

    goToProfile(uid) {
        Actions.profile({uid: uid});
    }

    render() {
        const {name, uid} = this.props.people.item;
        const {following} = this.props;

        return (
            <TouchableWithoutFeedback>
                <View>
                    <View style={styles.container}>
                        <Text style={styles.titleStyle} onPress={this.goToProfile.bind(this, uid)}>
                            {name}
                        </Text>
                        <View style={styles.row}>{
                            (following.indexOf(uid) > -1) ?
                                <Button style={styles.button} onPress={this.onUnfollow.bind(this)}
                                        title="Unfollow"/> :
                                <Button style={styles.button} onPress={this.onFollow.bind(this)}
                                        title="Follow"/>
                        }
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    container: {
        flexGrow: 1,
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderColor: '#ddd',
        position: 'relative'
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        order: 1,
        fontSize: 4
    },
    titleStyle: {
        order: 1,
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
