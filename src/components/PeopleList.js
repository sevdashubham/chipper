import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {userFetchAll, userFetchFollowing} from '../actions';
import PeopleItem from "./PeopleItem";

class PeopleList extends Component {
    componentWillMount() {
        this.props.userFetchAll();
    }

    render() {
        const {people, following} = this.props;
        return (
            <FlatList
                data={people}
                renderItem= { (person) => (
                    <PeopleItem people={person} following={following}/>
                )}
                keyExtractor={item => item.uid}
            />
        );
    }
}

const mapStateToProps = state => {
    const people = _.map(state.people, (val, uid) => {
        return {...val, uid};
    });
const following = state.following;

    return {people, following};
};

export default connect(mapStateToProps, {userFetchAll, userFetchFollowing})(PeopleList);
