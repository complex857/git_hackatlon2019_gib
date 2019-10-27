import React, { Component, Fragment } from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, SectionList, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import CustomHeader from '../components/CustomHeader';
import defaultTasks from '../assets/jsons/diddits-base';
import commonStyles from '../styles/Common';

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
      <Text style={commonStyles.p}>
        The total points you earned: <Text style={{fontWeight: 'bold'}}>{totalPoints}</Text>
      </Text>
    );
  }

  noTasksDone() {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.h1}>You haven't done any tasks yet</Text>
      </View>
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
          <Text style={commonStyles.h1}>{title}</Text>
        )}
      />
    );
  }

  render() {
    if (this.state.tasksDone === null || this.state.tasks === null) {
      return null;
    }

    return (
      <SafeAreaView style={commonStyles.container}>
        <ScrollView style={commonStyles.contentContainer}>
          {this.totalPoints()}
          {this.state.tasksDone.length === 0 ? this.noTasksDone() : this.tasksDone() }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

SettingsScreen.navigationOptions = {
  header: (props) => <CustomHeader title="Dashboard" {...props} />
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderColor: '#a6b1e1',
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
  }
});

export default withNavigationFocus(SettingsScreen);

