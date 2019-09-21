import React, { Component } from "react";
import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import FoodHunt from "./FoodHunt";
import * as Font from "expo-font";
import * as firebase from "firebase";
import HomeScreen from "./Screens/HomeScreen2";

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
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <View />
        ) : (
          <View style={styles.container}>
            {/* <FoodHunt /> */}
            <HomeScreen />
          </View>
        )}
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});
