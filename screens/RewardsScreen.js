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

export default class RewardScreen extends Component {

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


  render() {
    return (
      <View style={commonStyles.contentContainer}>
        <Text style={commonStyles.h1}>Rewards</Text>
      </View>
    );
  }
}

RewardScreen.navigationOptions = {
  header: props => <CustomHeader {...props} />
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    display: 'flex',
    margin: 10,
  },
});
