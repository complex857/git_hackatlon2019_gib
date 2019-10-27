import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component, Fragment } from 'react';
import { Image, ActivityIndicator, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View } from 'react-native';
import AsyncStorage from "@callstack/async-storage";
import { MonoText } from '../components/StyledText';
import defaultTasks from '../assets/jsons/diddits-base';
import { Button, OrangeButton, GrayButton } from '../components/Button';
import CustomHeader from '../components/CustomHeader';
import commonStyles from '../styles/Common';

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
      const allTasks = [...defaultTasks, ...JSON.parse(tasks || '[]')];
      const task = allTasks.find((task) => task.name === this.props.navigation.getParam('task'))
      this.setState(() => ({ task }))

      AsyncStorage.getItem("current_task").then(currentTask => {
        if (currentTask) {
          const task = allTasks.find((task) => task.name === currentTask)
          this.setState(() => ({ task: task, started: true }))
        }
      });
    });

  }

  setStarted = (value) => {
    this.setState({started: value})
    AsyncStorage.setItem("current_task", this.state.task.name);
  }

  onCancel = () => {
    AsyncStorage.setItem("current_task", '')
    this.props.navigation.navigate('Home');
  }

  setFinished = async (value) => {
    AsyncStorage.getItem("tasks_done").then(tasksDone => {
      tasksDone = JSON.parse(tasksDone || '[]')

      tasksDone = tasksDone.concat([{
        task: this.state.task.name,
        rating: 0,
        doneAt: (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(),
      }]);

      AsyncStorage.setItem("current_task", '');
      AsyncStorage.setItem("tasks_done", JSON.stringify(tasksDone));
      this.props.navigation.navigate('Done', {task: this.state.task.name, index: tasksDone.length - 1})
    });
  }

  taskDetails(task) {
    return (
      <Fragment>
        <View style={commonStyles.p}>
          <Text style={commonStyles.h1}>{task.name}</Text>
        </View>
        <View style={commonStyles.p}>
          <Text>{task.description}</Text>
        </View>
      </Fragment>
    );
  }

  beforeStart(task) {
    return (
      <View style={{...commonStyles.container, margin: 30}}>
        {this.taskDetails(task)}
        <View style={commonStyles.p}>
          <Text>
            Difficulty (the points will earn): <Text style={{fontWeight: 'bold'}}>{task.points}</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer} >
          <Button title="Start" onPress={() => this.setStarted(true) } />
        </View>
        <View style={styles.buttonContainer} >
          <GrayButton title="Back" onPress={() => this.props.navigation.navigate('Home') } />
        </View>
      </View>
    );
  }

  afterStart(task) {
    return (
      <View style={{...commonStyles.container, margin: 30}}>
        {this.taskDetails(task)}
        <View style={styles.buttonContainer} >
          <Button title="I'm Done!" onPress={() => this.setFinished(true) } />
        </View>
        <View style={styles.buttonContainer} >
          <GrayButton title="Changed My Mind" onPress={() => this.onCancel()} />
        </View>
      </View>
    );
  }

  render() {
    const { task, started, finished } = this.state;

    if (!task) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.h1}>{task.tite}</Text>

        {!started && this.beforeStart(task)}
        {started  && !finished && this.afterStart(task)}
      </View>
    );
  }
}

ProgressScreen.navigationOptions = {
  header: props => <CustomHeader {...props} />
};


const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    display: 'flex',
    margin: 10,
  },
});
