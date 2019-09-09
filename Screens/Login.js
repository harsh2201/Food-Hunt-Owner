import React, { Component } from "react";
<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
=======
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
>>>>>>> 8cba91c53120d1b1d38bda34c6ec8c3938ea79e1
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
// import  from "react-native-remote-svg";

export default class Login extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#FD6E6A", "#FFC600"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.container}>
              <Text style={styles.text}>FoodHunt</Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.buttonText}
                onPress={() => {
                  console.log("Hello FB");
                  this.props.navigation.navigate("Navigator");
                }}
              >
                <Image
                  style={{ height: 10 }}
                  source={require("../assets/facebook.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonText}>
                <Image
                  style={{ height: 10 }}
                  source={require("../assets/google.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // position: "relative",
    top: "25%",
    left: 0,
    right: 0
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    color: "orange",
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
    flex: 1,
    textAlign: "center",
    paddingRight: 15,
    paddingLeft: 15
  }
});
