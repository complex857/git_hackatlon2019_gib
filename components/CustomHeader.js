import React, { useState, Component } from 'react';
import { Platform, Image, View, text } from 'react-native';
import { Header } from 'react-native-elements';
import commonStyles from '../styles/Common';


export default (props) => {
  return (
    <Header
      placement="center"
      centerComponent={
        <Image style={{margin: 10, width: 242, height: 60}} source={require('../assets/images/logo.png')} />
      }
      containerStyle={commonStyles.header}

    />
  );
};
