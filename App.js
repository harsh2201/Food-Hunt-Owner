import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FoodHunt from "./FoodHunt";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FoodHunt />
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
