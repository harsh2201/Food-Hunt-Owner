import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

class CustomText extends Component {
  render() {
    const style = [{ fontFamily: "Nuni" }, this.props.style || {}];
    const allProps = Object.assign({}, this.props, { style: style });
    return <Text {...allProps}>{this.props.children}</Text>;
  }
}
export default CustomText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
