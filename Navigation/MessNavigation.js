import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../data/customText";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../Screens/HomeScreen";
import { Transition } from "react-native-reanimated";

class MessNavigation extends Component {
  render() {
    const { navigation } = this.props;
    let data = navigation.getParam("mess");
    console.log(data);

    return (
      <View style={styles.container}>
        <Text>{}</Text>
      </View>
    );
  }
}

const AppSwitchNavigator = createStackNavigator(
  {
    MessList: HomeScreen,
    MessDetail: MessNavigation
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
    // transition: (
    //   <Transition.Together>
    //     <Transition.Out
    //       type="slide-bottom"
    //       durationMs={400}
    //       interpolation="easeIn"
    //     />
    //     <Transition.In type="fade" durationMs={500} />
    //   </Transition.Together>
    // )
  }
);

export default AppNavigator = createAppContainer(AppSwitchNavigator);

// export default MessNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
