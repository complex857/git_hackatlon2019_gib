import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button, TouchableHighlight } from 'react-native';
import { MonoText } from '../components/StyledText';
import defaultTasks from '../assets/jsons/diddits-base';
import AsyncStorage from "@callstack/async-storage";

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      tasks: [],
    }
  }

  setModalVisible = async (value) => {
    this.setState({modalVisible: value});
    await AsyncStorage.setItem("start_popup_visible", JSON.stringify(false));
    this.setState(() => ({modalVisible: false }));
  }

  componentWillMount() {
    AsyncStorage.getItem("tasks").then(tasks => {
      tasks = JSON.parse(tasks || '[]');
      this.setState(() => ({
        tasks: [...defaultTasks, ...tasks]
      }))
    });
    AsyncStorage.getItem("start_popup_visible").then(modalVisible => {
      modalVisible = JSON.parse(modalVisible || 'true');
      this.setState(() => ({ modalVisible }))
    });
  }

  // componentDidMount() {
  //   this.setTask()
  // }

  // setTask = async () => {
  //   const newTasks = [{
  //     "name":"Get out of bed 2",
  //     "description":"Get out of bed! Come on! 2",
  //     "public":true,
  //     "location":"Bedroom",
  //     "time":"9:00",
  //     "reocurrence":null,
  //     "tags":null,
  //     "points":10,
  //     "rewards":"low",
  //     "author":"Diddit Crew"
  //   }];
  //   await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  //   this.setState(() => ({
  //     tasks: newTasks,
  //   }));
  // };

  render() {
    const navigation = this.props.navigation;
    const tasks = this.state.tasks;
    console.log(tasks);

    return (
      <View style={styles.container}>
        { this.state.modalVisible && (
          <View style={{marginTop: 22}}>
            <Modal presentationStyle="overFullScreen" animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => { this.setModalVisible(false); }}>
              <View style={{marginTop: 22}}>
                <Text style={styles.h1}>Hi There!</Text>
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
                  <Button title="Alright, got it!" onPress={() => this.setModalVisible(false) } />
                </View>
              </View>
            </Modal>
          </View>
        )}
        {!this.state.modalVisible && (
          <View>
            <Text style={{textAlign: 'center', margin: 10, fontSize: 22, fontWeight: 'bold'}}>Pick a diddit!</Text>
            <View style={{ flexDirection: 'row', width: '100%', flex: 1, padding: 20, height: 50 }}>
              { shuffle(tasks).slice(0, 3).map((task, i) => (
                <View key={`task-${i}`} style={styles.buttonContainer} >
                  <Button style={{padding: 20}} title={task.name} onPress={() => navigation.push('Progress', {task: task.name}) } />
                </View>
              ))}
            </View>
            <Button title="Lets add a task!" onPress={() => navigation.push('Editor', {task: null}) } />
          </View>
        )}
      </View>
    );
  }

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
    flex: '1 1 auto',
    display: 'flex',
    margin: 10,
  },
  p: {
    margin: 10,
  },
  dismissBtn: {
    textAlign: 'center',
  },
  h1: {
   margin: 10,
   fontSize: 16,
   fontWeight: 'bold'
  },
});
