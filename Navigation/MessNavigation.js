import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../data/customText";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../Screens/HomeScreen2";
import MessDetail from "../Screens/MessDetail";
import Favourites from "../Screens/Favourites";

export default class MessNavigation extends Component {
  render() {
    return this.props.isHome ? <AppNavigatorH /> : <AppNavigatorF />;
  }
}

const AppSwitchNavigatorH = createStackNavigator(
  {
    MessList: HomeScreen,
    MessDetail: MessDetail
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
  }
);

const AppSwitchNavigatorF = createStackNavigator(
  {
    Favourites: Favourites,
    MessDetail: MessDetail
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
  }
);

const AppNavigatorH = createAppContainer(AppSwitchNavigatorH);
const AppNavigatorF = createAppContainer(AppSwitchNavigatorF);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
