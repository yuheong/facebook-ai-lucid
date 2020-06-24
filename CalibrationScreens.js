import React, { useState } from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
import CardComponent from './CardComponent';
import * as Progress from 'react-native-progress';
import ParagraphComponent from './ParagraphComponent';

const testingPrompts = ['He does not eat chilli as he is not afraid of the spiciness.', 'I\'m trying to think of a sentence but I just can\'t, so this will have to do.', 'You\'re waiting for a train, a train that will take you far away. '];

export default function CalibrationScreens({ navigation }) {
  const [progress, setProgress] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
        <Progress.Bar style={{ marginBottom: 20 }} progress={(progress) / testingPrompts.length} width={300} color={'#E7698A'} />
        {progress < 3 ?
          <>
            <Text style={styles.codeColor}>Read the following sentence out loud</Text>
            <CardComponent cardText={testingPrompts[progress]} />
          </> :
          <>
            <Text style={styles.codeColor}>Calibration complete</Text>
            <ParagraphComponent text="Awesome! We can now test your intoxication level in the Test section." />
            <Image style={{ marginTop: 50 }} source={require('./images/tick.png')} />
          </>
        }
        <TouchableOpacity onPress={() => { setProgress(progress + 1) }}>
          <Text>Current step: {progress}</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  codeColor: {
    fontSize: 18,
    textAlign: "left",
  },
})