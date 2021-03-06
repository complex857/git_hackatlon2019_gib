import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component, Fragment } from 'react';
import { Image, ActivityIndicator, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View } from 'react-native';
import { Button, OrangeButton, GrayButton } from '../components/Button';
import { Rating, AirbnbRating } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { MonoText } from '../components/StyledText';
import defaultTasks from '../assets/jsons/diddits-base';
import CustomHeader from '../components/CustomHeader';
import commonStyles from '../styles/Common';

export default class DoneScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: null,
      tasks: [],
    }
  }

  componentWillMount() {
    AsyncStorage.getItem("tasks").then(tasks => {
      tasks = JSON.parse(tasks || '[]');
      const task = [...defaultTasks, ...tasks].find((task) => task.name === this.props.navigation.getParam('task'))
      this.setState(() => ({ task, tasks }))
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

    const ownTask = this.state.tasks.find((t) => t.name === this.state.task.name)

    return (
      <View style={commonStyles.contentContainer}>
      <View style={commonStyles.container}>
          <Text style={commonStyles.h1}>Congratulations, you have done a diddit!</Text>
          <Text style={commonStyles.p}>
          You have earned <Text style={{fontWeight: 'bold'}}>{task.points}</Text> more points!
          </Text>
      </View>

        <Text style={commonStyles.h1}>
          How much did you like it?
        </Text>

        <View style={commonStyles.p}>
          <AirbnbRating
            showRating={false}
            count={3}
            defaultRating={0}
            size={40}
            onFinishRating={this.onRating}
          />
        </View>
        { !ownTask &&
          <View style={styles.buttonContainer} >
            <Button title="Let's do an another one!" onPress={() =>  this.props.navigation.navigate('Home')}  />
          </View>
        }
        { ownTask &&
          <View style={styles.buttonContainer} >
            <Button title="Keep this Diddit" onPress={() =>  this.props.navigation.navigate('Home')}  />
            <GrayButton title="Remove" onPress={() => {
              this.state.tasks.forEach((t) => {
                if (this.state.task.name === t.name) {
                  t.hidden = true
                }
              });
              AsyncStorage.setItem("tasks", JSON.stringify(this.state.tasks));
              this.props.navigation.navigate('Home');
            }}  />
          </View>
        }
      </View>
    );
  }
}

DoneScreen.navigationOptions = {
  header: props => <CustomHeader {...props} />
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    display: 'flex',
    margin: 10,
  },
});
