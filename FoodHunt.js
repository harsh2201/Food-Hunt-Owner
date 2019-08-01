import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Navigator from "./Navigation/Navigator";
import Login from "./Screens/Login";

export default class FoodHunt extends Component {
  render() {
    return <AppNavigator />;
  }
}
// export default FoodHunt;

const AppSwitchNavigator = createSwitchNavigator({
  Login: Login,
  Navigator: Navigator
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
