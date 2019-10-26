import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button, TouchableHighlight, TextInput } from 'react-native';
import { MonoText } from '../components/StyledText';
import defaultTasks from '../assets/jsons/diddits-base';
import AsyncStorage from "@callstack/async-storage";

export default class TaskEditorScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      taskId: this.props.taskId ? this.props.taskId : "new",
      taskAtHand: {},
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


  theBetterSetState = (fieldName, value) => {
    this.setState(() => (
      {taskAtHand: {
        ...this.state.taskAtHand,
        [fieldName]: value
      }})
    );
    console.log(fieldName + "saved name state to " + value);
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
      <View style={styles.container}>
        <Text>Diddit Editor</Text>
        <Text>Title:</Text>
        <TextInputField innerText="Text" fieldName={"title"} value={this.state.taskAtHand.title} saveStateFunc={this.theBetterSetState}/>
        <Text>Description:</Text>
        <TextInputField innerText="Text" fieldName="description" value={this.state.taskAtHand.description} saveStateFunc={this.theBetterSetState}/>
        <Text>Difficulty:</Text>
        <TextInputField innerText="Text" fieldName="rank" value={this.state.taskAtHand.rank} saveStateFunc={this.theBetterSetState}/>
        <Text>Public or Nah?</Text>
        <TextInputField innerText="Text" fieldName="public" value={this.state.taskAtHand.public} saveStateFunc={this.theBetterSetState}/>
        <Text>Location:</Text>
        <TextInputField innerText="Text" fieldName="location" value={this.state.taskAtHand.location} saveStateFunc={this.theBetterSetState}/>
        <Text>Time / Reocurrence:</Text>
        <TextInputField innerText="Text" fieldName="time" value={this.state.taskAtHand.time} saveStateFunc={this.theBetterSetState}/>
        <Text>Tags:</Text>
        <TextInputField innerText="Text" fieldName="tags" value={this.state.taskAtHand.tags} saveStateFunc={this.theBetterSetState}/>
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
    textAlign: 'center'
  }
});
