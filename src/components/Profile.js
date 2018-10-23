import React from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native'
import {colors} from "../utils/constants";
import firebase from "firebase";
import ListItem from './ListItem';
import _ from "lodash";

export default class Main extends React.Component {
    state = {
        name: '',
        handle: '',
        followersCount: 0,
        followingsCount: 0,
        tweets: []
    };

    componentDidMount() {
        this.getUserProfile();
        this.getUserTweets();
    }

    getUserProfile() {
        firebase.database().ref(`/user_profiles/${this.props.uid}`)
            .on('value', snapshot => {
                const user = snapshot.val();
                console.log(JSON.stringify(user));
                this.setState({
                    name: user.name,
                    handle: user.handle,
                    followersCount: user.followersCount,
                    followingsCount: user.followingsCount
                });
            });
    }

    getUserTweets() {
        firebase.database().ref(`/tweets/${this.props.uid}`)
            .on('value', snapshot => {
                const tweetsArray = _.map(snapshot.val(), (val, uid) => {
                    return {...val, uid};
                });
                this.setState({tweets: tweetsArray});
            });
    }

    render() {
        const {
            name,
            handle,
            followersCount,
            followingsCount,
            tweets
        } = this.state;

        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.info}>@{handle}</Text>
                        <Text
                            style={styles.description}>Followers: {followersCount ? followersCount : 0} {" "} Following: {followingsCount ? followingsCount : 0}</Text>
                    </View>
                </View>
                <View>
                    {(typeof tweets !== 'undefined' && tweets.length > 0) ?
                        <FlatList
                            data={tweets}
                            renderItem={tweet => (
                                <ListItem tweet={tweet}/>
                            )}
                            keyExtractor={item => item.uid}
                        /> : <Text style={{justifyContent: 'center'}}>
                            This user hasn't started tweeting yet :(
                        </Text>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        height: 250
    },
    name: {
        fontSize: 28,
        color: colors.WHITE,
        fontWeight: "bold"
    },
    info: {
        fontSize: 16,
        color: colors.SECONDARY,
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: colors.SECONDARY,
        marginTop: 10
    }
});
