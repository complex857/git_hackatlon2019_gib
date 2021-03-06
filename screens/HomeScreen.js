import * as WebBrowser from 'expo-web-browser';
import React, { Component, Fragment } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import CustomHeader from '../components/CustomHeader';
import { Button, OrangeButton } from '../components/Button';
import defaultTasks from '../assets/jsons/diddits-base';
import { AsyncStorage } from 'react-native';
import commonStyles from '../styles/Common';

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

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      tasks: [],
    }
  }


  fetchData = () => {
    AsyncStorage.getItem("tasks").then(tasks => {
      tasks = JSON.parse(tasks || '[]').filter(t => !t.hidden);
      this.setState(() => ({
        tasks: tasks
      }))
    });
    AsyncStorage.getItem("start_popup_visible").then(modalVisible => {
      modalVisible = JSON.parse(modalVisible || 'true');
      this.setState(() => ({ modalVisible }))
    });
    AsyncStorage.getItem("current_task").then(currentTask => {
      if (currentTask) {
        this.props.navigation.navigate('Progress', { task: currentTask });
      }
    });
  }

  setModalVisible = async (value) => {
    this.setState({modalVisible: value});
    await AsyncStorage.setItem("start_popup_visible", JSON.stringify(false));
    this.setState(() => ({modalVisible: false }));
  }

  componentWillMount() {
    this.fetchData();
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.fetchData()),
    ];
  }

  render() {
    const navigation = this.props.navigation;
    const tasks = this.state.tasks;

    return (
      <View style={commonStyles.container}>
        { this.state.modalVisible && (
          <View style={{marginTop: 22}}>
            <Modal style={styles.popup} presentationStyle="overFullScreen" animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => { this.setModalVisible(false); }}>
              <View style={{marginTop: 22}}>
                <Text style={commonStyles.h1}>Ready to change how you attack your goals? </Text>
                <View style={commonStyles.p}>
                  <Text> 1.	Add diddits </Text>
                  <Text> Big or small – it doesn’t matter. You define the difficulty level. Alternatively, choose from a suggested diddit or community diddit.  </Text>
                </View>

                <View style={commonStyles.p}>
                  <Text> 2.  Choose rewards </Text>
                  <Text> Choose up to three rewards you will give to yourself when you have completed some of your diddits. They can be something small like getting ice cream or something bigger like a holiday – it’s up to you!  </Text>
                </View>

                <View style={commonStyles.p}>
                  <Text>3.	Get it done</Text>
                  <Text>As you complete diddits, we will remind you to reward yourself! diddit is more than a to-do list. It’s a way to change your perception of tasks and reward yourself for a job well done. Too often we don’t recognise our own achievements, so diddit is here to help.</Text>
                </View>

                <View style={styles.dismissBtn}>
                  <Button title="Alright, got it!" onPress={() => this.setModalVisible(false) } />
                </View>
              </View>
            </Modal>
          </View>
        )}
        {!this.state.modalVisible && (
          <ScrollView>
            <Text style={{textAlign: 'center', margin: 10, fontSize: 22, fontWeight: 'bold'}}>
              Let's get started, pick a Diddit!
            </Text>
            { shuffle(defaultTasks).slice(0, 3).map((task, i) => (
              <View key={`task-${i}`} style={styles.buttonContainer} >
                <Button title={task.name} onPress={() => navigation.push('Progress', {task: task.name}) } />
              </View>
            ))}
            {tasks.length > 0 && (
              <Fragment>
                <Text style={{textAlign: 'center', margin: 10, fontSize: 22, fontWeight: 'bold'}}>Your own tasks</Text>
                {shuffle(tasks).map((task, i) => (
                  <View key={`task-${i}`} style={styles.buttonContainer} >
                    <OrangeButton title={task.name} onPress={() => navigation.push('Progress', {task: task.name}) } />
                  </View>
                ))}
              </Fragment>
            )}
            <View style={commonStyles.p}>
              <Text style={{textAlign: 'center', margin: 10, fontSize: 16, fontWeight: 'bold'}}>Don't like these? Add your own</Text>
              <View style={styles.buttonContainer} >
                <OrangeButton title="Create a new Diddit!" onPress={() => navigation.push('Editor', {task: null}) } />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: (props) => <CustomHeader {...props} />
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    margin: 10,
  },
  dismissBtn: {
    margin: 20,
  },
  popup: {
    margin:30,
    borderWidth: 2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: '#d0e562',
  }
});

export default withNavigationFocus(HomeScreen);
