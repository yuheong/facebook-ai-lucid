import React from 'react';
import { StyleSheet, Button, View, Text, Image } from 'react-native';

export default function ParagraphComponent(props) {
    return (
        <View style={{ marginTop: 50, marginLeft: 10, marginRight: 10 }}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        //alignSelf: 'center',
        fontSize: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#E7698A',
        marginBottom: 20,
    }
})