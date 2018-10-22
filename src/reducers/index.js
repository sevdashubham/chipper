import { combineReducers } from 'redux';
// import AuthReducer from './AuthReducer';
import TweetFormReducer from './tweetForm.reducer';
import TweetReducer from './tweet.reducer';
import UserReducer from './user.reducer';
import FollowingReducer from './following.reducer';

export default combineReducers({
    // auth: AuthReducer,
    following: FollowingReducer,
    tweetForm: TweetFormReducer,
    tweets: TweetReducer,
    people: UserReducer

});
