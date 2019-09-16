import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

class Developers extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/developer.png")}
        >
          {/* <Text>Developers</Text> */}
        </ImageBackground>
      </View>
    );
  }
}
export default Developers;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
