import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FoodHunt from "./FoodHunt";
// import Profile from "./Screens/profile";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FoodHunt />
        {/* <Profile /> */}
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
