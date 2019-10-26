import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component, Fragment } from 'react';
import { Image, ActivityIndicator, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button } from 'react-native';
import AsyncStorage from "@callstack/async-storage";
import { MonoText } from '../components/StyledText';
import defaultTasks from '../assets/jsons/diddits-base';

export default class ProgressScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: null,
      started: false,
      finished: false,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem("tasks").then(tasks => {
      const task = [...defaultTasks, ...JSON.parse(tasks || '[]')].find((task) => task.name === this.props.navigation.getParam('task'))
      this.setState(() => ({ task }))
    });
  }

  setStarted = (value) => {
    this.setState({started: value})
  }

  setFinished = async (value) => {
    AsyncStorage.getItem("tasks_done").then(tasksDone => {
      tasksDone = JSON.parse(tasksDone || '[]')

      tasksDone = tasksDone.concat([{
        task: this.state.task.name,
        rating: null,
        doneAt: (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(),
      }]);

      AsyncStorage.setItem("tasks_done", JSON.stringify(tasksDone));
      this.props.navigation.navigate('Done', {task: this.state.task.name, index: tasksDone.length - 1})
    });
  }

  beforeStart(task) {
    return (
      <Fragment>
        <View style={styles.p}>
          <Text>{task.description}</Text>
        </View>
        <View style={styles.p}>
          <Text>
            Difficulty (the points will earn): <Text style={{fontWeight: 'bold'}}>{task.points}</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer} >
          <Button title="Start" onPress={() => this.setStarted(true) } />
        </View>
      </Fragment>
    );
  }
  afterStart(task) {
    return (
      <View style={styles.buttonContainer} >
        <Button title="I'am Done" onPress={() => this.setFinished(true) } />
      </View>
    );
  }

  render() {
    const { task, started, finished } = this.state;

    if (!task) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>{task.tite}</Text>

        {!started && this.beforeStart(task)}
        {started  && !finished && this.afterStart(task)}
      </View>
    );
  }
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
  },
  p: {
    margin: 10,
  },
  dismissBtn: {
    textAlign: 'center'
  },
  h1: {
   margin: 10,
   fontSize: 16,
   fontWeight: 'bold'
  }
});
