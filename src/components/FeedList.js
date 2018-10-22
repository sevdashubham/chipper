import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {tweetsFetchAll} from '../actions';
import ListItem from './ListItem';

class FeedList extends Component {
    componentWillMount() {
        const {following} = this.props;
        this.props.tweetsFetchAll({following});
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
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return {tweets, following};

};

export default connect(mapStateToProps, {tweetsFetchAll})(FeedList);
