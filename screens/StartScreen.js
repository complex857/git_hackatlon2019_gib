import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function StartScreen() {

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/dont-panic.png')          }
            style={styles.welcomeImage}
          />
        </View>


        <Text>Routiney!</Text>
      </ScrollView>
    </View>
  );


}

StartScreen.navigationOptions = {
  header: null,
  title: 'app.json',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: "100%",
    minWidth: 300,
    height: "auto",
    resizeMode: 'contain',
  }
});
