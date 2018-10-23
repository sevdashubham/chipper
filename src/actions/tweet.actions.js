import firebase from 'firebase';
import {tweetConstants} from '../constants';
import {Actions} from "react-native-router-flux";
import {
    AsyncStorage
} from 'react-native';

export const tweetUpdate = ({prop, value}) => {
    return {
        type: tweetConstants.TWEET_UPDATE,
        payload: {prop, value}
    };
};

export const tweetCreate = ({handle, text, timestamp}) => {
    console.log('XXXXX' + text);
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/tweets/${currentUser.uid}`)
            .push({ handle, text, timestamp})
            .then(() => {
                Actions.main();
                dispatch({type: tweetConstants.TWEET_CREATE});
            });
    };
};

export const tweetsFetch = ({uid}) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/tweets/${uid}`)
            .on('value', snapshot => {
                dispatch({type: tweetConstants.TWEETS_FETCH_SUCCESS, payload: snapshot.val()});
            });
    };
};

export const tweetsFetchAll = (following) => {
    return (dispatch) => {
        const {currentUser} = firebase.auth();
        let feedToFetch = [currentUser.uid];
        if (following instanceof Array && following !== null) {
            feedToFetch = feedToFetch.concat(following);
            console.log(feedToFetch);
        }
        let arr = [];
        feedToFetch.map(function (key) {
            return firebase.database().ref("/tweets/").child(key).on('value', snapshot => {
                snapshot.forEach(function (item) {
                    arr = [...arr, item.val()];
                });
                dispatch({type: tweetConstants.TWEETS_FETCH_SUCCESS, payload: arr});
            });
        });
    };

};


