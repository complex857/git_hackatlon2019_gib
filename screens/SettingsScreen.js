import React, { Component, Fragment } from 'react';
import AsyncStorage from "@callstack/async-storage";
import { StyleSheet, Text, View, SafeAreaView, SectionList, } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import defaultTasks from '../assets/jsons/diddits-base';

const findTask = (name, tasks) => {
  return tasks.find(task => task.name === name);
}

function Item({item, tasks}) {
  const task = findTask(item.task, tasks);
  if (!task) {
    return null;
  }
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{task.name}</Text>
      <Text style={styles.title}>Points Earned: {task.points}</Text>
      <Text style={styles.title}>Completed At: {item.doneAt}</Text>
    </View>
  );
}

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksDone: null,
      tasks: null,
    }
  }

  fetchData = () => {
    AsyncStorage.getItem("tasks_done").then(tasksDone => {
      tasksDone = JSON.parse(tasksDone || '[]')
      this.setState({ tasksDone })
    });
    AsyncStorage.getItem("tasks").then(tasks => {
      tasks = [...defaultTasks, ...JSON.parse(tasks || '[]')]
      this.setState({ tasks })
    });
  }

  componentDidMount() {
    this.fetchData();
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.fetchData()),
    ];
  }

  totalPoints() {
    const totalPoints = this.state.tasksDone.reduce((acc, td) => {
      const task = findTask(td.task, this.state.tasks)
      if (task) {
        return acc + task.points;
      }
      return acc;
    }, 0);
    return (
      <Text style={styles.p}>
        The total points you earned: <Text style={{fontWeight: 'bold'}}>{totalPoints}</Text>
      </Text>
    );
  }

  noTasksDone() {
    return (
      <Text style={styles.h1}>You haven't done any tasks yet</Text>
    );
  }

  tasksDone() {
    return (
      <SectionList
        sections={[{
          title: 'Diddits you did!',
          data: this.state.tasksDone,
        }]}
        keyExtractor={(item, index) => item + index}
        renderItem={props => <Item {...props} tasks={this.state.tasks} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.h1}>{title}</Text>
        )}
      />
    );
  }

  render() {
    if (this.state.tasksDone === null || this.state.tasks === null) {
      return null;
    }

    return (
      <View style={styles.contentContainer}>
        <SafeAreaView style={styles.container}>
          {this.totalPoints()}
          {this.state.tasksDone.length === 0 && this.noTasksDone() }
        </SafeAreaView>
      </View>
    );
  }
}

SettingsScreen.navigationOptions = {
  title: 'Profile page',
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
  p: {
    margin: 10,
  },
  h1: {
   margin: 10,
   fontSize: 16,
   fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
});

export default withNavigationFocus(SettingsScreen);

