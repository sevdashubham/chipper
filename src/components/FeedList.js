import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {userFetchFollowing} from '../actions';
import ListItem from './ListItem';
import * as c from '../utils/constants';

class FeedList extends Component {
    componentWillMount() {
        this.props.userFetchFollowing();
    }


    render() {
        const {tweets} = this.props;
        return (
            <FlatList
                data={tweets}
                renderItem={tweet => (
                    <ListItem tweet={tweet}/>
                )}
                keyExtractor={item => item.uid}
            />
        );
    }
}

const mapStateToProps = state => {
    const following = state.following;
    const tweets = _.map(state.tweets, (val, uid) => {
        return {...val, uid};
    });
    tweets.sort(function (a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return {tweets, following};

};

export default connect(mapStateToProps, {userFetchFollowing})(FeedList);
