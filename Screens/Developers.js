import React, { Component } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Text from "../data/customText";

class Developers extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Developers</Text>
      </View>
    );
  }
}
export default Developers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center"
  }
});
