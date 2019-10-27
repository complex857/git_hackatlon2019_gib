import React, { Component, Fragment } from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, SectionList, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
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
      level: 1,
    }
  }

  nextLevelXp = (level) => {
    return (3 * (level ^ 5)) / 4;
  }

  fetchData = () => {
    AsyncStorage.getItem("tasks_done").then(tasksDone => {
      tasksDone = JSON.parse(tasksDone || '[]')
      this.setState({ tasksDone })

      AsyncStorage.getItem("level").then(level => {
        level = parseInt(level, 10) || 1;
        this.setState({ level })

        const checkLevelUp = () => {
          while (this.totalPointsValue() > this.nextLevelXp(level)) {
            level++
            this.setState({level: level })
            AsyncStorage.setItem("level", level);
          }
        }
        checkLevelUp();
      });
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

  totalPointsValue = () => {
    return this.state.tasksDone.reduce((acc, td) => {
      const task = findTask(td.task, this.state.tasks)
      if (task) {
        return acc + task.points;
      }
      return acc;
    }, 0);
  }

  totalPoints() {
    return (
      <Text style={commonStyles.p}>
        The total points you earned: <Text style={{fontWeight: 'bold'}}>{this.totalPointsValue()}</Text>
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

    const percent = ((this.totalPointsValue()) / this.nextLevelXp(this.state.level) ) * 100;

    return (
      <SafeAreaView style={commonStyles.container}>

        <View style={{width: 320, height: 50, paddingTop: 30}}>
          <ProgressBar percent={percent} fillBackground="#d0e562">
            <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                width="30"
                src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
              />
            )}
          </Step>
          <Step transition="scale">
            {({ accomplished }) => (
              <img
                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                width="30"
                src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
              />
            )}
          </Step>
        </ProgressBar>
        </View>

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

