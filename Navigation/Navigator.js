import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";
import Text from "../data/customText";
import MessNavigation from "../Navigation/MessNavigation";
import Developers from "../Screens/Developers";
// import SparkButton from "react-native-sparkbutton";

export default class Navigator extends React.Component {
  static title = "Bottom Navigation";

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
        key: "developers",
        title: "Developers",
        icon: "code",
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
            return <MessNavigation />;
          },
          favorites: () => {
            return (
              <View style={[styles.content]}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 25
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
                    fontSize: 25
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
          developers: () => {
            return <Developers />;
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
