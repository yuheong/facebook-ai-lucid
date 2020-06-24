import React from 'react';
import { StyleSheet, Button, View, Text, Image } from 'react-native';

const intoxicatedText = 'We have estimated that your intoxication is at the level that significantly lowers inhibitors, leading to poor decision making. Your contacts are being notified now...'
const fineText = 'We have estimated that your intoxication level is at a safe level and you are sober. Have fun and be safe!'

export default function ResultComponent(props) {
    return (
        <View style={{ margin: 20, alignSelf: 'flex-start'}}>
            <Text style={styles.title}>
                Results
            </Text>
            <Text>
                Level of intoxication:
            </Text>
            <Text style={styles.resultText}>
                {props.result}%
            </Text>
            <Text>
                {props.result > 50 ? intoxicatedText : fineText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    resultText: {
        fontSize: 68,
        color: '#E7698A',
        margin: 40,
        marginLeft: 110,
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
    }
})