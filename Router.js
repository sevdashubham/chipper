import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import FeedList from './src/components/FeedList';
import TweetCreate from './src/components/TweetCreate';
import Login from "./src/components/Login";
import SignUp from './src/components/SignUp';
import PeopleList from "./src/components/PeopleList";
import Profile from "./src/components/Profile";


const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
            <Scene key="auth">
                <Scene key="login" component={Login} title="Login" />
                <Scene key="SignUp" component={SignUp} title="SignUp" />
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
                <Scene key="tweetCreate" component={TweetCreate} title="Post Tweet" />
                <Scene key="profile" component={Profile} title="Profile"/>
            </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
