import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button, TouchableHighlight } from 'react-native';
import { MonoText } from '../components/StyledText';

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      { modalVisible && (
        <View style={{marginTop: 22}}>
          <Modal presentationStyle="overFullScreen" animationType="slide" transparent={false} visible={modalVisible} onRequestClose={() => { setModalVisible(false); }}>
            <View style={{marginTop: 22}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Hi There!</Text>
              <View style={styles.p}>
                <Text>Have this ever happened to you...</Text>
                <Text>You wake up and have a hard time to decide why would you get out of bed?</Text>
                <Text>There are things to do around the house, but can't decide what to get started on?</Text>
                <Text>Your days lack structure or routine?</Text>
              </View>

              <View style={styles.p}>
                <Text>We are here to help!</Text>
                <Text>This app will recommend you some basic things that you can get started on right away. Just pick one of the presets (you can edit these later, don't worry). And get crackin!</Text>
                <Text>Every accomplismeht will be recognised and rememberd forever by us. You just tell us how it went and once you've a few of these we'll help you put together a schedule of them</Text>
              </View>

              <View style={styles.p}>
                <Text>Sounds good? Good!</Text>
              </View>

              <View tyle={styles.dismissBtn}>
                <Button title="Alright, got it!" onPress={() => setModalVisible(false) } />
              </View>
            </View>
          </Modal>
        </View>
      )}
      {!modalVisible && (
        <View style={{ flexDirection: 'row', width: '100%', flex: 1, padding: 20, height: 50 }}>
          <View style={styles.buttonContainer} >
            <Button title="Task 1" onPress={() => navigation.push('Progress', {task: 'Task 1'}) } />
          </View>
          <View style={styles.buttonContainer} >
            <Button title="Task 2" onPress={() => navigation.push('Progress', {task: 'Task 2'}) } />
          </View>
          <View style={styles.buttonContainer} >
            <Button title="Task 3" onPress={() => navigation.push('Progress', {task: 'Task 3'}) } />
          </View>
        </View>
      )}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
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
  },
  p: {
    margin: 10,
  },
  dismissBtn: {
    textAlign: 'center'
  }
});
