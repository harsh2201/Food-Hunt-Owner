import React, { Component } from "react";
import { View, Text, StyleSheet, Easing, Animated } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Navigator from "./Navigation/Navigator";
import Login from "./Screens/Login";
// import {  } from "expo";
import { zoomOut } from "react-navigation-transitions";

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

const AppSwitchNavigator = createStackNavigator(
  {
    Login: Login,
    Navigator: Navigator
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 350,
        // easing: Easing.easeOutExpo,
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { position, layout, scene, index, scenes } = sceneProps;

        const thisSceneIndex = scene.index;
        const height = layout.initHeight;
        const width = layout.initWidth;

        var thisSceneParams = scene.route.params || {};

        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0]
        });

        const translateY = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [
            thisSceneIndex - 1,
            thisSceneIndex - 0.5,
            thisSceneIndex
          ],
          outputRange: [0, 1, 1]
        });

        const scale = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [4, 1, 1]
        });

        const slideFromRight = { transform: [{ translateX }] };
        const scaleWithOpacity = {
          opacity,
          transform: [{ scaleX: scale }, { scaleY: scale }]
        };
        const slideInFromBottom = { transform: [{ translateY }] };
        return scaleWithOpacity;
      }
    })
  }
);

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
