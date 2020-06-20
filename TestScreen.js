import React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
import ParagraphComponent from './ParagraphComponent';

const title = 'Testing';
const text = 'By referencing your speech in the calibration phase, we\'ll be able to roughly determine your intoxication level. Try to speak as naturally as possible for the test.';

export default function TestScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <ParagraphComponent title={title} text={text} />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('TestingPage')}>
          <Image source={require('./images/beginTest.png')} />
        </TouchableOpacity>
      </View>
    </View >
  );
}
