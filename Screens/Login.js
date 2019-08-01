import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo";
import { TouchableOpacity } from "react-native-gesture-handler";
import Image from "react-native-remote-svg";

export default class Login extends Component {
  render() {
    return (
      <LinearGradient
        colors={["#ffe259", "#ffa751"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>foodHUNT</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonText}>
            <Image source={require("../assets/facebook.svg")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonText}>
            <Image source={require("../assets/google.svg")} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "25%",
    left: 0,
    right: 0
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    position: "absolute",
    bottom: "5%",
    left: 0,
    right: 0,
    height: 100,
    width: 260,
    margin: 70,
    fontWeight: "bold",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff"
  },
  buttonText: {
    textAlign: "center",
    paddingRight: 15,
    paddingLeft: 15
  }
});
