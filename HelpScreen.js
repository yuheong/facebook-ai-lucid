import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import ParagraphComponent from './ParagraphComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const title = 'You\'re helping Jemin Sieow!';
const text = 'Jemin has an intoxication level of 73%. At this level, inhibitors are significantly lowered, leading to poor decision making.'

export default function HelpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ParagraphComponent title={title} text={text} />
      <Image style={{ margin: 20 }} source={require('./images/map.png')} />
      <TouchableOpacity onPress={() => {  }} style={{ margin: 20 }}>
        <Text>Listen to voice recording</Text>
      </TouchableOpacity>
      <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 30, marginLeft: 10 }}>
        <Text>Your code: <Text style={styles.codeColor}>XFD14</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  codeColor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#E7698A',
  },
})