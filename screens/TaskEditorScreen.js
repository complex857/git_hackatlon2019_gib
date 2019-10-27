import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component } from 'react';
import { Image, Slider, Modal, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button, TouchableHighlight, TextInput, Divider} from 'react-native';
import { MonoText } from '../components/StyledText';
import defaultTasks from '../assets/jsons/diddits-base';
import AsyncStorage from "@callstack/async-storage";

import { Rating, AirbnbRating, CheckBox} from 'react-native-elements';

export default class TaskEditorScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      taskId: this.props.taskId ? this.props.taskId : "new",
      taskAtHand: {difficulty: 2, public: false},
      modalVisible: false,
      tasks: [],
    }
  }

  componentWillMount() {

    if (this.props.taskId != "new" || this.props.taskId != null) {
      AsyncStorage.getItem("tasks").then(tasks => {
        tasks = JSON.parse(tasks || '[]');

        tasks.forEach(function(theTask) {
          if (theTask.id == "taskId") {
            this.setState(() => {taskAtHand: theTask} );
          }
        })

        this.setState(() => ({
          tasks: [...tasks]
        }))

      });
    }

  }

  ratingCompleted = (rating) => {
    this.setState(() => (
      {taskAtHand: {
        ...this.state.taskAtHand,
        difficulty: rating
      }})
    );
  }

  theBetterSetState = (fieldName, value) => {
    this.setState(() => (
      {taskAtHand: {
        ...this.state.taskAtHand,
        [fieldName]: value
      }})
    );
    console.log(fieldName + "saved name state to " + value);
  }

  updateCheckbox = () => {
    console.log("Swapping");
    this.setState(() => (
      {taskAtHand: {
        ...this.state.taskAtHand,
        public: !this.state.taskAtHand.public
      }})
    );
  }

  setModalVisible = async (value) => {
    this.setState({modalVisible: value});
    await AsyncStorage.setItem("start_popup_visible", JSON.stringify(false));
    this.setState(() => ({modalVisible: false }));
  }

  saveIt = async () => {

    //ADD SOME VALIDATION I GUESS?!


    //SEE IF TASK IS NEW
    console.log(this.state.taskId);
    if (this.state.taskId == "new") {

      let newID = this.state.tasks.length;
      let myNewTask = this.state.taskAtHand;
      myNewTask.taskId = newID;

      const newTasks = [...this.state.tasks, myNewTask];
      this.setState ({tasks: [...this.state.tasks, this.state.taskAtHand]});
      console.log(newTasks);
      await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
      console.log("Save Complete");

      this.props.navigation.push('Home', {});

      //console.log("Saving");
      //this.saveTasks();

    }

   //  else {
   //   var newTasksList = this.state.tasks;
   //   newTasksList.forEach(function(theTask) {
   //     if (theTask.taskId == this.state.taskId) {
   //       theTask = this.state.taskAtHand
   //     }
   //   })
   //
   //   this.setState(() => ({
   //     tasks: newTasksList
   //   }))
   //
   // }

  }

  // componentDidMount() {
  //   this.setTask()
  // }

  saveTasks = async () => {
    const newTasks = this.state.tasks;
    console.log(newTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
    console.log("Save Complete");
  };

  render() {
    const navigation = this.props.navigation;
    const tasks = this.props.task;
    console.log(tasks);

    return (
      <View className="taskEditor mainContainer">
        <Text>Diddit Editor</Text>

        <View className="container">
          <Text>Title:</Text>
          <TextInputField innerText="Text" fieldName={"title"} value={this.state.taskAtHand.title} saveStateFunc={this.theBetterSetState}/>
          <Text>Description:</Text>
          <TextInputField innerText="Text" fieldName="description" value={this.state.taskAtHand.description} saveStateFunc={this.theBetterSetState}/>
          <Text>Difficulty:</Text>
        </View>

        <AirbnbRating
          count={3}
          reviews={["Easy (<15 mins)", "Meh (>15 || <45 mins)", "Why did I sign up for this? (>45 mins)"]}
          defaultRating={this.state.taskAtHand.difficulty}
          size={20}
          onFinishRating={this.ratingCompleted}
        />

        <CheckBox
          right
          title='Share with friends?'
          checked={this.state.taskAtHand.public}
          onPress={this.updateCheckbox}
        />
        <View style={{ width:"100px", height:"200px", alignItems: 'stretch', justifyContent: 'center' }}>
          <Slider
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
          />
          <Text>Value: {this.state.value}</Text>
        </View>

        <View className="advanced">

          <Text className="title">Time / Reocurrence:</Text>
          <TextInputField innerText="Text" fieldName="time" value={this.state.taskAtHand.time} saveStateFunc={this.theBetterSetState}/>
          <Text className="title">Location:</Text>
          <TextInputField innerText="Text" fieldName="location" value={this.state.taskAtHand.location} saveStateFunc={this.theBetterSetState}/>
          <Text className="title">Tags:</Text>
          <TextInputField innerText="Text" fieldName="tags" value={this.state.taskAtHand.tags} saveStateFunc={this.theBetterSetState}/>
        </View>

        <Button title="save" onPress={this.saveIt} />
      </View>
    );
  }
}

TaskEditorScreen.navigationOptions = {
  header: null
};

const TextInputField = (props) => {
  return (
    <TextInput
      className="fancyTextInput"
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => props.saveStateFunc(props.fieldName, text)}
      value={props.value}
    />
  );
}


const styles = StyleSheet.create({
  mainContainer:{
    display: "flex",
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  container: {
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  p: {
    margin: 10,
  },
  dismissBtn: {
    textAlign: 'center'
  }
});
