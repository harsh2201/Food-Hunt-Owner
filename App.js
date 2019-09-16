import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import FoodHunt from "./FoodHunt";
import * as Font from "expo-font";
import * as firebase from "firebase";

import firebaseConfig from "./data/config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    console.ignoredYellowBox = ["Setting a timer"];
    await Font.loadAsync({
      Nuni: require("./assets/fonts/Nunito-Regular.ttf")
    });
    this.setState({
      isLoading: false
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View />
        ) : (
          <View style={styles.container}>
            <FoodHunt />
          </View>
        )}
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
