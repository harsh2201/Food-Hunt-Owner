import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../data/customText";
import LottieView from "lottie-react-native";
import * as firebase from "firebase";

class Loading extends Component {
  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.props.navigation.navigate("Navigator");
      } else {
        this.props.navigation.navigate("Login");
      }
      this.setState({});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          style={styles.loader}
          source={require("../assets/Lottie/cooking.json")}
          // progress={this.state.progress}
          autoPlay={true}
          speed={1.25}
        />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
}
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loader: {
    height: 100,
    width: 150
  },
  text: {
    fontSize: 20,
    marginTop: 10
  }
});
