import React from 'react';
import { Platform, } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import TaskEditorScreen from '../screens/TaskEditorScreen';
import DoneScreen from '../screens/DoneScreen';
import SettingsScreen from '../screens/SettingsScreen';


const config = Platform.select({
  web: {
    headerMode: 'screen',
    header: props => <CustomHeader {...props} />
  },
  default: {
    header: props => <CustomHeader {...props} />
  },
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Progress: ProgressScreen,
    Editor: TaskEditorScreen,
    Done: DoneScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Diddit!',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
