import React from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
import CardComponent from './CardComponent';
import * as Progress from 'react-native-progress';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import ResultComponent from './ResultComponent';
import AcknowledgeComponent from './AcknowledgeComponent';

const testingPrompts = ['What should you do when you\'re freezing in an air-conditioned room and want to feel warmer?'] //, 'What do you do when you\'re feeling thirsty?'];
const prompt = ['What should you do in order to take up by 8am for your meeting?']
const API_URL = 'https://lucidai.herokuapp.com/'

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.state = {
      progress: 0,
      isRecording: false,
      isFetcing: false,
      query: null,

    }
  }

  handleOnPressIn = () => {
    this.startRecording();
  }

  handleOnPressOut = () => {
    this.stopRecording();
    this.getTranscription();
  }

  render() {
    const { navigation } = this.props
    let content;
    if (this.state.progress < testingPrompts.length) {
      content = (
        <>
          <Text style={styles.codeColor}>Answer the following question</Text>
          <CardComponent cardText={prompt[this.state.progress]} />
        </>
      )
    } else if (this.state.progress === 1) {
      content = (
        <>
          <ResultComponent result={74} />
        </>
      )
    } else {
      content = (
        <>
          <AcknowledgeComponent />
        </>
      )
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
        <Progress.Bar progress={this.state.progress / testingPrompts.length} width={300} color={'#E7698A'} />
        {content}
        
        <TouchableOpacity onPress={() => { this.setState({ progress: this.state.progress + 1 }) }}>
          <Text style={{color: "white"}}>Current step: {this.state.progress}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
            style={styles.button}
            onPressIn={this.handleOnPressIn}
            onPressOut={this.handleOnPressOut}
          >
            <Text>Record</Text>
          </TouchableOpacity> */}
      </View>
    );
  }

  getTranscription = async () => {
    this.setState({ isFetching: true });
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
      {/* const uri = info.uri;
            const formData = new FormData();
            formData.append('file', {
                uri,
                type: 'audio/x-wav',
                name: 'speech2text'
            });
            const response = await fetch(config.CLOUD_FUNCTION_URL, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
            this.setState({ query: data.transcript }); */}
    } catch (error) {
      console.log('There was an error reading file', error);
      this.stopRecording();
      this.resetRecording();
    }
    this.setState({ isFetching: false });
  }

  startRecording = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') return;

    this.setState({ isRecording: true });
    // some of these are not applicable, but are required
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,

    });
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      this.stopRecording();
    }
    this.recording = recording;
  }

  stopRecording = async () => {
    this.setState({ isRecording: false });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
  }

  deleteRecordingFile = async () => {
    console.log("Deleting file");
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      await FileSystem.deleteAsync(info.uri)
    } catch (error) {
      console.log("There was an error deleting recording file", error);
    }
  }

  resetRecording = () => {
    this.deleteRecordingFile();
    this.recording = null;
  }
}

const recordingOptions = {
  // android not currently in use, but parameters are required
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#48C9B0',
    paddingVertical: 20,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  codeColor: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 20,
  },
});