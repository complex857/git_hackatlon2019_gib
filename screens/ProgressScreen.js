import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button } from 'react-native';
import { MonoText } from '../components/StyledText';

export default function ProgressScreen({ navigation }) {
  const task = navigation.getParam('task')

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <MonoText> World Domination ({task}) in progress </MonoText>
      </View>
    </View>
  );
}

ProgressScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    margin: 10,
  }
});
