import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import moment from 'moment';

class ListItem extends Component {
    onRowPress() {
        // Actions.employeeEdit({ employee: this.props.employee });
    }

    render() {
        console.log(this.props);
        const { text, timestamp } = this.props.tweet.item;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {text}
                        </Text>
                         <Text style={styles.titleStyle}>
                             {moment.utc(timestamp * 1000).local().fromNow() }
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        color: "#000",
        fontSize: 18,
        paddingLeft: 15
    }
};

export default ListItem;
