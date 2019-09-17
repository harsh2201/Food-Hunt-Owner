import * as React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { BottomNavigation, Paragraph } from "react-native-paper";
import * as Font from "expo-font";
import Profile from "../Screens/profile";

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
                    fontSize: 30
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
            return <Profile />;
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
  },
  header: {
    backgroundColor: "#F75728",
    height: 200,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 150,
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#F75728"
  }
});
