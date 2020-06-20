import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import ParagraphComponent from './ParagraphComponent';

const title = 'Calibration';
const text = 'Before we can test your intoxication level, we first need to calibrate what you sound like when you\'re sober. Please ensure that you are 100% sober before running this calibration. Try to speak as naturally as possible.';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <ParagraphComponent title={title} text={text} />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Calibration')}>
          <Image source={require('./images/beginCalibration.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}