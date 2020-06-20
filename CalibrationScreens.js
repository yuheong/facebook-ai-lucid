import React, { useState } from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
import CardComponent from './CardComponent';
import * as Progress from 'react-native-progress';

const testingPrompts = ['He does not eat chilli as he is not afraid of the spiciness.', 'I\'m trying to think of a sentence but I just can\'t, so this will have to do.'];

export default function CalibrationScreens({ navigation }) {
  const [progress, setProgress] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
        <Progress.Bar progress={(progress + 1) / 2} width={300} color={'#E7698A'}/>
        <Text>Read the following sentence</Text>
        <CardComponent cardText={testingPrompts[progress]} />
        <TouchableOpacity onPress={() => { setProgress(progress + 1) }}>
          <Text>Current step: {progress}</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}
