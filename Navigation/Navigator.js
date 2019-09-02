import * as React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { BottomNavigation, Paragraph } from "react-native-paper";
import * as Font from "expo-font";

export default class Navigator extends React.Component {
  static title = "Bottom Navigation";

  async componentDidMount() {
    await Font.loadAsync({
      Nuni: require("../assets/fonts/Nunito-Regular.ttf")
    });
  }

  state = {
    index: 0,
    routes: [
      {
        key: "home",
        title: "Home",
        icon: "home",
        color: "#039b3b"
      },
      {
        key: "favorites",
        title: "Favorites",
        icon: "favorite",
        color: "#E81B38"
      },
      {
        key: "profile",
        title: "Profile",
        icon: "person",
        color: "#F75728"
      },
      {
        key: "aboutUs",
        title: "About Us",
        icon: "info",
        color: "#000"
      }
    ]
  };

  render() {
    return (
      <BottomNavigation
        // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        renderScene={BottomNavigation.SceneMap({
          home: () => {
            return (
              <View style={styles.content}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                    fontFamily: "Nuni"
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
          favorites: () => {
            return (
              <View style={[styles.content]}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                    fontFamily: "Nuni"
                  }}
                >
                  Favourites
                </Text>
              </View>
            );
          },
          profile: () => {
            return (
              <View style={[styles.content]}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                    fontFamily: "Nuni"
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
          aboutUs: () => {
            return (
              <View style={[styles.content, { backgroundColor: "#000" }]}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                    fontFamily: "Nuni",
                    color: "#fff"
                  }}
                >
                  About Us
                </Text>
              </View>
            );
          }
        })}
      />
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  item: {
    height: Dimensions.get("window").width / 2,
    width: "50%",
    padding: 4
  },
  photo: {
    flex: 1,
    resizeMode: "cover"
  }
});
