import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import ParagraphComponent from './ParagraphComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const title = 'Yuhe Ong has acknowledged!';
const text = 'Hang in there, help is on the way!'

export default function AcknowledgeComponent({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ParagraphComponent title={title} text={text} />
      <Image style={{ margin: 20 }} source={require('./images/map.png')} />
      <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 30, marginLeft: 10 }}>
        <Text style={styles.codeColor}>Yuhe Ong is coming in about 5 minutes...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  codeColor: {
    fontSize: 14,
    color: '#E7698A',
  },
})