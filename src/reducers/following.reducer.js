import {userConstants} from '../constants';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userConstants.USER_FETCH_FOLLOWING:
            return action.payload;
        default:
            return state;
    }
};
