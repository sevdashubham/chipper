import firebase from 'firebase';
import {userConstants} from '../constants';
import {tweetsFetchAll} from './tweet.actions';

export const userCreate = ({name, handle}) => {
    const {currentUser} = firebase.auth();
    const email = currentUser.email;
    return (dispatch) => {
        firebase.database().ref(`/user_profiles/${currentUser.uid}`)
            .push({email, name, handle})
            .then(() => {
                dispatch({type: userConstants.USER_CREATE_SUCCESS});
            });
    };
};

export const userFollow = ({uid, handle, name}) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/following/${currentUser.uid}`).child(uid)
            .set({handle, name})
            .then(() => {
                dispatch({type: userConstants.USER_FOLLOW});
                firebase.database().ref(`/followers/${uid}`).child(currentUser.uid)
                    .set({handle, name})
                    .then(() => {
                        dispatch(userFetchFollowing);
                        dispatch({type: userConstants.USER_FOLLOW_SUCCESS});
                    });
            }).then(() => {
            const databaseRef = firebase.database().ref('user_profiles').child(uid).child('followersCount');
            databaseRef.transaction(function (searches) {
                console.log(searches);
                searches++;
                console.log(searches);
                return searches;
            });
            const databaseRefFollowing = firebase.database().ref('user_profiles').child(currentUser.uid).child('followingsCount');
            databaseRefFollowing.transaction(function (searches) {
                console.log(searches);
                searches++;
                console.log(searches);
                return searches;
            });
        });
    };
};

export const userUnfollow = ({uid, handle, name}) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/following/${currentUser.uid}/${uid}`)
            .remove()
            .then(() => {
                dispatch({type: userConstants.USER_UNFOLLLOW});
                firebase.database().ref(`/followers/${uid}/${currentUser.uid}`)
                    .remove()
                    .then(() => {
                        dispatch(userFetchFollowing);
                        dispatch({type: userConstants.USER_UNFOLLOW_SUCCESS});
                    }).then(() => {
                    const databaseRef = firebase.database().ref('user_profiles').child(uid).child('followersCount');
                    databaseRef.transaction(function (searches) {
                        console.log(searches);
                        searches--;
                        console.log(searches);
                        return (searches);
                    });
                    const databaseRefFollowing = firebase.database().ref('user_profiles').child(currentUser.uid).child('followingsCount');
                    databaseRefFollowing.transaction(function (searches) {
                        console.log(searches);
                        searches--;
                        console.log(searches);
                        return searches;
                    });
                });
            });
    }
};

export const userFetch = () => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/user_profiles/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({type: userConstants.USER_FETCH_SUCCESS, payload: snapshot.val()});
            });
    };
};

export const userFetchAll = () => {
    return (dispatch) => {
        firebase.database().ref(`/user_profiles`)
            .on('value', snapshot => {
                dispatch({type: userConstants.USER_FETCH_ALL_SUCCESS, payload: snapshot.val()});
            });
    };
};

export const userFetchFollowing = () => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        dispatch(userFetch);
        let feedToFetch = [];
        firebase.database().ref(`/following/${currentUser.uid}`)
            .on('value', snapshot => {
                if (snapshot.val() !== null) {
                    feedToFetch = Object.keys(snapshot.val());
                } else {
                    feedToFetch = [];
                }
                dispatch(tweetsFetchAll(feedToFetch));
                dispatch({type: userConstants.USER_FETCH_FOLLOWING, payload: feedToFetch});
            });
    };
};

