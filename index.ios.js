/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import App from './src/containers/App';
var {
  AppRegistry,
} = React;

var TodoList = React.createClass({
  render: function() {
    return (
      <App />
    );
  }
});

AppRegistry.registerComponent('TodoList', () => TodoList);
