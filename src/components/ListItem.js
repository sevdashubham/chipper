import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import moment from 'moment';
import {colors} from '../utils/constants';

class ListItem extends Component {
    onRowPress() {
        // Actions.employeeEdit({ employee: this.props.employee });
    }

    render() {
        console.log(this.props);
        const {handle, text, timestamp} = this.props.tweet.item;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <View style={styles.card}>
                        <View style={styles.tweetHead}>
                            <Text style={styles.tweetHandle}>
                                @{handle}
                            </Text>
                            <Text style={styles.timeStamp}>
                                {moment.utc(timestamp * 1000).local().fromNow()}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.tweet}>
                                {text}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    card: {
        flexGrow: 1,
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderColor: '#ddd',
        position: 'relative'
    },
    tweetHandle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    tweetHead: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    timeStamp: {
        flexDirection: "row",
        alignSelf: "flex-end",
        paddingLeft: 15,
        borderBottomColor: colors.LIGHT_GRAY,
        borderBottomWidth: 2
    },
    tweetReply: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    }
};

export default ListItem;
