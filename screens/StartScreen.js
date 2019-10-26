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

export default class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),

    };
  }

render() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

        <View style={styles.welcomeContainer}>
          <Image
            source={
              (this.state.currentDate.getDay() != 3)
              ?
              require('../assets/images/dont-panic.png')
              :
              {uri: 'https://www.trzcacak.rs/myfile/full/327-3275733_wednesday-frog-png-wednesday-my-dudes-frog-png.png'}
            }

            style={styles.welcomeImage}
          />
        </View>

        <Text>Diddit!</Text>
      </ScrollView>
    </View>
  );
}
}

StartScreen.navigationOptions = {
  header: null,
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
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
    minHeight: 200,
    resizeMode: 'contain',
  }
});
