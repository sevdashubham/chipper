import { tweetConstants } from '../constants';

const INITIAL_STATE = {
    text: '',
    timestamp: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case tweetConstants.TWEET_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case tweetConstants.TWEET_CREATE:
            return INITIAL_STATE;
        case tweetConstants.TWEET_SAVE_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};
