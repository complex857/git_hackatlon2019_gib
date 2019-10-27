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
                <Text style={commonStyles.h1}>Hi There!</Text>
                <View style={commonStyles.p}>
                  <Text>Have this ever happened to you...</Text>
                  <Text>You wake up and have a hard time to decide why would you get out of bed?</Text>
                  <Text>There are things to do around the house, but can't decide what to get started on?</Text>
                  <Text>Your days lack structure or routine?</Text>
                </View>

                <View style={commonStyles.p}>
                  <Text>We are here to help!</Text>
                  <Text>This app will recommend you some basic things that you can get started on right away. Just pick one of the presets (you can edit these later, don't worry). And get crackin!</Text>
                  <Text>Every accomplismeht will be recognised and rememberd forever by us. You just tell us how it went and once you've a few of these we'll help you put together a schedule of them</Text>
                </View>

                <View style={commonStyles.p}>
                  <Text>Sounds good? Good!</Text>
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
            <Text style={{textAlign: 'center', margin: 10, fontSize: 22, fontWeight: 'bold'}}>Let's get started, pick a task!</Text>
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
