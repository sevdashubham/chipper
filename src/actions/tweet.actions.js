import firebase from 'firebase';
import {tweetConstants} from '../constants';
import {userFetchFollowing} from 'user.actions';

export const tweetUpdate = ({prop, value}) => {
    return {
        type: tweetConstants.TWEET_UPDATE,
        payload: {prop, value}
    };
};

export const tweetCreate = ({text, timestamp}) => {
    console.log('XXXXX' + text);
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/tweets/${currentUser.uid}`)
            .push({text, timestamp})
            .then(() => {
                dispatch({type: tweetConstants.TWEET_CREATE});
                dispatch(userFetchFollowing())
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
        console.log(following);
        const {currentUser} = firebase.auth();
        let feedToFetch = [currentUser.uid];
        // const feedToFetch = ["ph9UFk2d8kNsc5hvG0F1nWIbksJ2", "Yq9cruNBOZOzzpaAXNlqo6vsr8v2"];
        if (following instanceof Array && following !== null) {
            feedToFetch = feedToFetch.concat(following);
            console.log(feedToFetch);
        }
        let promises = feedToFetch.map(function (key) {
            return firebase.database().ref("/tweets/").child(key).once("value");
        });
        Promise.all(promises).then(function (snapshots) {
            let arr = [];
            snapshots.forEach(function (snapshot) {
                snapshot.forEach(function (item) {
                    // arr.push(item.val())
                    arr = [...arr, item.val()];
                });
            });
            console.log(arr);
            dispatch({type: tweetConstants.TWEETS_FETCH_SUCCESS, payload: arr})
        });
    };

};
