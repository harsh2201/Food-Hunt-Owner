import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Card from "../Components/Card";
import Text from "../data/customText";

class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      messData: []
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("messData");
      // const messData = JSON.parse(value);
      this.setState({
        messData: JSON.parse(value)
      });
      console.log(messData);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {this.state.messData.map((rowData, key) => {
            return (
              <TouchableOpacity
                key={rowData.name}
                onPress={() => {
                  this.props.navigation.navigate("MessDetail", {
                    mess: rowData
                  });
                }}
              >
                <Card liked={false} messData={rowData} key={rowData.name} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20
  }
});
