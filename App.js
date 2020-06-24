import * as React from 'react';
import { Button, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ContactsScreen from './ContactsScreen';
import TestScreen from './TestScreen';
import TestPageScreen from './TestPageScreen';
import CalibrationScreens from './CalibrationScreens';
import HelpScreen from './HelpScreen';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={allScreenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={commonHeaderOptions} />
      <HomeStack.Screen name="Calibration" component={CalibrationScreens} options={commonHeaderOptions} />
      <HomeStack.Screen name="Help" component={HelpScreen} options={commonHeaderOptions} />
    </HomeStack.Navigator>
  );
}

const TestStack = createStackNavigator();

function TestStackScreen() {
  return (
    <TestStack.Navigator screenOptions={allScreenOptions}>
      <TestStack.Screen name="Test" component={TestScreen} options={commonHeaderOptions} />
      <TestStack.Screen name="TestingPage" component={TestPageScreen} options={commonHeaderOptions} />
    </TestStack.Navigator>
  );
}

const ContactsStack = createStackNavigator();

function ContactsStackScreen() {
  return (
    <ContactsStack.Navigator screenOptions={allScreenOptions}>
      <ContactsStack.Screen name="Contacts" component={ContactsScreen} options={commonHeaderOptions} />
      {/* <ContactsStack.Screen name="Details" component={DetailsScreen} options={commonHeaderOptions} /> */}
    </ContactsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer screenOptions={allScreenOptions}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'md-clipboard'
            } else if (route.name === 'Test') {
              iconName = 'md-finger-print'
            } else if (route.name === 'Contacts') {
              iconName = 'md-people'
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#E7698A',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Test" component={TestStackScreen} />
        <Tab.Screen name="Contacts" component={ContactsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const allScreenOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#E7698A',
  },
  headerBackground: () => (
    <Image
      style={{ width: 375, resizeMode: 'cover'}}
      source={require('./images/lucid.png')}
    />
  ),
}

const commonHeaderOptions = {
  title: "",
}