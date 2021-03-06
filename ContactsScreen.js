import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import ParagraphComponent from './ParagraphComponent';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    name: 'Mum',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }
]

const title = 'Contacts';
const text = 'In the case of a high intoxication level, your contacts will be notified in this order.'

export default function ContactsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ParagraphComponent title={title} text={text} />
      {
        list.map((l, i) => (
          <ListItem
            key={i}
            leftAvatar={{ source: { uri: l.avatar_url } }}
            title={l.name}
            subtitle={l.subtitle}
            bottomDivider
          />
        ))
      }
      <TouchableOpacity onPress={() => {  }} style={{ margin: 20 }}>
        <Image source={require('./images/addContact.png')} />
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