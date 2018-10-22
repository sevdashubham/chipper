import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import FeedList from './src/components/FeedList';
import TweetCreate from './src/components/TweetCreate';
import Login from "./src/components/Login";
import SignUp from './src/components/SignUp';
import PeopleList from "./src/components/PeopleList";

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
            <Scene key="auth">
                <Scene key="login" component={Login} title="Please Login" />
                <Scene key="SignUp" component={SignUp} title="Please SignUp" />
            </Scene>

            <Scene key="main">
                <Scene
                    onRight={() => Actions.tweetCreate()}
                    onLeft={() => Actions.searchPeople()}
                    leftTitle="Search"
                    rightTitle="Tweet"
                    key="feedList"
                    component={FeedList}
                    title="feed"
                    initial
                />
                <Scene key="searchPeople" component={PeopleList} title="People" />
                <Scene key="tweetCreate" component={TweetCreate} title="Create Tweet" />
            </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
