import React from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
import CardComponent from './CardComponent';
import * as Progress from 'react-native-progress';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

const testingPrompts = ['He does not eat chilli as he is not afraid of the spiciness.', 'I\'m trying to think of a sentence but I just can\'t, so this will have to do.'];

export default class CalibrationScreens extends React.Component {
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
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
          <Progress.Bar progress={(this.state.progress + 1) / 2} width={300} color={'#E7698A'} />
          <Text>Read the following sentence</Text>
          <CardComponent cardText={testingPrompts[this.state.progress]} />
          <TouchableOpacity onPress={() => { this.setState({ progress: this.state.progress + 1 }) }}>
            <Text>Current step: {this.state.progress} {this.state.haveRecordingPermissions}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPressIn={this.handleOnPressIn}
            onPressOut={this.handleOnPressOut}
          >
            <Text>Record</Text>
          </TouchableOpacity>
        </View>
      </View >
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
  }
});