import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button } from 'react-native';
import { MonoText } from '../components/StyledText';

export default function DoneScreen({ navigation }) {
  const task = navigation.getParam('task')

  return (
    <View style={styles.container}>
    <MonoText> Task Done screen </MonoText>
    </View>
  );
}

DoneScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
});
