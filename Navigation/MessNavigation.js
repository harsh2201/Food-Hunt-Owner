import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../data/customText";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../Screens/HomeScreen2";
import MessDetail from "../Screens/MessDetail";
import { Transition } from "react-native-reanimated";

// class MessNavigation extends Component {
//   render() {
//     const { navigation } = this.props;
//     let data = navigation.getParam("mess");
//     console.log(data);

//     return (
//       <View style={styles.container}>
//         <Text>{}</Text>
//       </View>
//     );
//   }
// }

const AppSwitchNavigator = createStackNavigator(
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

export default AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
