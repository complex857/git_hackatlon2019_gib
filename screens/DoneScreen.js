import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component, Fragment } from 'react';
import { Image, ActivityIndicator, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import AsyncStorage from "@callstack/async-storage";
import { MonoText } from '../components/StyledText';
import defaultTasks from '../assets/jsons/diddits-base';

export default class DoneScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: null,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem("tasks").then(tasks => {
      const task = [...defaultTasks, ...JSON.parse(tasks || '[]')].find((task) => task.name === this.props.navigation.getParam('task'))
      this.setState(() => ({ task }))
    });
  }

  onRating = async (value) => {
    AsyncStorage.getItem("tasks_done").then(tasksDone => {
      tasksDone = JSON.parse(tasksDone || '[]')
      const index = this.props.navigation.getParam('index')
      if (!tasksDone[index]) {
        return;
      }

      const td = tasksDone[index];
      td.rating = value;
      AsyncStorage.setItem("tasks_done", JSON.stringify(tasksDone));
    });
  }

  render() {
    const task = this.state.task;
    if (!task) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Congratulations, you have done a diddit!</Text>
        <Text style={styles.p}>
          You have earned <Text style={{fontWeight: 'bold'}}>{task.points}</Text> more points!
        </Text>

        <Text style={styles.p}>
          How much did you like it?
        </Text>

        <View style={styles.p}>
          <AirbnbRating
            showRating={false}
            count={3}
            defaultRating={2}
            size={40}
            onFinishRating={this.onRating}
          />
        </View>

      </View>
    );
  }
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
  h1: {
   margin: 10,
   fontSize: 16,
   fontWeight: 'bold'
  },
});
