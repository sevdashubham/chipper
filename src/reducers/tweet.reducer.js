import { tweetConstants } from '../constants';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case tweetConstants.TWEETS_FETCH_SUCCESS:
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};
