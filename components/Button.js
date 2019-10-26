import React from 'react';
import { Button as Btn } from 'react-native-elements';

export const Button = (props) => {
  return (
    <Btn
      // type="solid"
      // containerStyle={{
      //   backgroundColor: '#doe562',
      // }}
      buttonStyle={{
        backgroundColor: '#d0e562',
        borderWidth: 0,
        borderRadius: 15,
      }}
      titleStyle={{
        color: 'black'
      }}
      {...props}
    />
  );
};

export const OrangeButton = (props) => {
  return (
    <Btn
      // type="solid"
      // containerStyle={{
      //   backgroundColor: '#doe562',
      // }}
      buttonStyle={{
        backgroundColor: '#e88e33',
        borderWidth: 0,
        borderRadius: 15,
      }}
      titleStyle={{
        color: 'black'
      }}
      {...props}
    />
  );
};

export default Button;
