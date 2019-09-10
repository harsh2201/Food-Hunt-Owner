import React, { Component } from "react";
import { View, StyleSheet, Easing, Animated } from "react-native";
import { createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
// import { createStackNavigator } from "react-navigation-stack";

import Navigator from "./Navigation/Navigator";
import Login from "./Screens/Login";
import Loading from "./Screens/Loading";

export default class FoodHunt extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}
// export default FoodHunt;

const AppSwitchNavigator = createAnimatedSwitchNavigator(
  {
    Loading: Loading,
    Login: Login,
    Navigator: Navigator
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    )
  }
);

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
