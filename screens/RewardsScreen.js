import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component } from 'react';
import { Image, Slider, Modal, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, Button, TouchableHighlight, TextInput, Divider} from 'react-native';
import { MonoText } from '../components/StyledText';
import defaultTasks from '../assets/jsons/diddits-base';
import AsyncStorage from "@callstack/async-storage";
import commonStyles from '../styles/Common';
import '../styles/cheatSheet.css';
import CustomHeader from '../components/CustomHeader';

import { Rating, AirbnbRating, CheckBox} from 'react-native-elements';

export default class RewardsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      taskId: this.props.taskId ? this.props.taskId : "new",
      taskAtHand: {difficulty: 2, public: false, time: new Date().toLocaleString(), location: "Somewhere"},
      modalVisible: false,
      tasks: [],
      advancedShow: false,
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

  triggerAdvanced = () => {
    this.setState({advancedShow: !this.state.advancedShow});
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
      //await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
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
    //const newTasks = this.state.tasks;
    console.log(newTasks);
    //await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
    console.log("Save Complete");
  };

  render() {
    const navigation = this.props.navigation;
    const tasks = this.props.task;
    console.log(tasks);

    return (
      <View className="taskEditor mainContainer" style={styles.mainContainer}>

        <View className="wrapContain">

          <View className="container">
            <Text style={commonStyles.myLabel}>Whats your reward:</Text>
            <TextInputField style={commonStyles.myTextFields} helperText="Some important text" placeholder="Title" innerText="Text" fieldName={"name"} value={this.state.taskAtHand.title} saveStateFunc={this.theBetterSetState} />
            <Text style={commonStyles.myLabel}>Explain it a bit more:</Text>
            <TextInputField className="textField" placeholder="Description" innerText="Text" fieldName="description" value={this.state.taskAtHand.description} saveStateFunc={this.theBetterSetState}/>
          </View>

                    <br />

          <Text style={commonStyles.myLabel}>What difficulty should you receive this reward?</Text>
          <AirbnbRating
            count={3}
            reviews={["Easy", "Medium", "Hard"]}
            defaultRating={this.state.taskAtHand.difficulty}
            size={40}
            onFinishRating={this.ratingCompleted}
          />

                    <br />
                              <br />

          <Button title="save" onPress={this.saveIt} />

        </View>

      </View>
    );
  }
}


RewardsScreen.navigationOptions = {
  header: (props) => <CustomHeader {...props} />
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
    width: "50%",
    minWidth:"400px",
    margin: "auto",
    height: "100%",
    backgroundColor: 'rgb(255, 248, 232)',
  },
  container: {
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
  },
  funkyButton: {
    background: "green!important",
  }
});
