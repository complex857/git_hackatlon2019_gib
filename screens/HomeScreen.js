import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button } from 'react-native';
import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', width: '100%', flex: 1, padding: 20, height: 50 }}>
        <View style={styles.buttonContainer} >
          <Button title="Task 1" onPress={() => Alert.alert('Button 1')} />
        </View>
        <View style={styles.buttonContainer} >
          <Button title="Task 2" onPress={() => Alert.alert('Button 2')} />
        </View>
        <View style={styles.buttonContainer} >
          <Button title="Task 3" onPress={() => Alert.alert('Button 3')} />
        </View>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
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
