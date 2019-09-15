import React, { Component } from "react";
import * as Font from "expo-font";

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView
} from "react-native";
//console.log("statusBarHeight: ", StatusBar.currentHeight);
import {
  StackNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import reviewScreen from "./reviewScreen";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

class menuScreen extends Component {
  static navigationOptions = {
    header: null
  };

  /*async componentDidMount() {
    await Font.loadAsync({
      gothamblack: require("./assets/fonts/gothamblack.otf"),
      gotham9: require("./assets/fonts/gotham9.otf")
    });
    this.setState({ fontLoaded: true });
  }*/

  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      Default_Rating: 2,
      Max_Rating: 5,
      children: [],
      activeItemIndex: 0,
      unlimted: true,
      limited: false
    };

    this.Star =
      "http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png";

    this.Star_With_Border =
      "http://aboutreact.com/wp-content/uploads/2018/08/star_corner.png";
  }

  UpdateRating(key) {
    this.setState({ Default_Rating: key });
  }

  render() {
    let React_Native_Rating_Bar = [];
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}
        >
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.safeArea}>
        {this.state.fontLoaded ? (
          <SafeAreaView>
            <ScrollView style={styles.scrollview}>
              <View style={styles.top}></View>
              <View style={styles.messImage}>
                <Image
                  style={styles.messImage1}
                  source={{
                    uri:
                      "https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/bycr7qhntcdzglsfshwm"
                  }}
                />
              </View>

              <View style={styles.extra} />
              <View style={styles.mainDetails}>
                <View style={styles.mainDetails1}>
                  <Text style={styles.messName}>Gujarat Mess</Text>
                  <Text style={styles.smallDetails}>10:00 - 22:00</Text>
                </View>

                <View style={styles.rating}>
                  <View style={styles.subrat}>
                    <Text>Ratings</Text>
                    <Text style={{ color: "#FF4E00", fontWeight: "bold" }}>
                      4.8
                    </Text>
                  </View>

                  <View style={styles.subrat}>
                    <Text>Unlimited</Text>
                  </View>

                  <View style={styles.subrat}>
                    <Text>Limited</Text>
                  </View>
                </View>

                <View></View>
              </View>
              <View style={styles.menu}>
                <FlatList
                  data={[
                    { key: "Item1" },
                    { key: "Item2" },
                    { key: "Item3" },
                    { key: "Item4" },
                    { key: "Item5" },
                    { key: "Item6" },
                    { key: "Item7" },
                    { key: "Item8" },
                    { key: "Item9" },
                    { key: "Item10" },
                    { key: "Item11" },
                    { key: "Item12" }
                  ]}
                  renderItem={({ item }) => (
                    <Text style={styles.item}>{item.key}</Text>
                  )}
                />
              </View>

              <View>
                <Text style={styles.title}>Rate Us</Text>

                <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                <Text style={styles.textStyle}>
                  {this.state.Default_Rating} / {this.state.Max_Rating}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={() => alert(this.state.Default_Rating)}
                >
                  <Text>Don't tap here.</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.title}>Review</Text>
                <Text style={{ marginLeft: 15 }}>
                  Food quality was good but the service was ok ok.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate("review")}
                >
                  <Text>See all reviews</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        ) : null}
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  menu: menuScreen,
  review: reviewScreen
});
export default createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  scrollview: {
    backgroundColor: "white"
  },
  top: {
    height: screenHeight / 3,
    width: Dimensions.width,
    backgroundColor: "#FF4E00",
    zIndex: 0
  },
  subtop: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  messImage: {
    height: screenHeight / 3,
    width: screenWidth - 150,
    alignSelf: "center",
    backgroundColor: "#000000",
    zIndex: 1,
    position: "absolute",
    borderRadius: 30,
    marginTop: screenHeight / 8
  },
  messImage1: {
    height: screenHeight / 3,
    width: screenWidth - 150,
    borderRadius: 30
  },
  extra: {
    paddingTop: screenHeight / 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: screenHeight / 6,
    marginTop: -30,
    backgroundColor: "white",
    width: Dimensions.width,
    position: "relative"
  },
  mainDetails: {
    width: screenWidth,
    height: screenHeight / 6
  },
  messName: {
    fontSize: 24,
    marginLeft: 10,
    color: "#FF4E00",
    fontWeight: "bold"
  },
  smallDetails: {
    marginLeft: 10,
    fontSize: 14
  },
  mainDetails1: {
    height: screenHeight / 12
  },

  rating: {
    flexDirection: "row"
  },
  subrat: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth / 3,
    borderWidth: 1,
    borderLeftColor: "white",
    borderBottomColor: "white",
    borderTopColor: "white",
    height: screenHeight / 12
  },

  title: {
    fontSize: 18,
    color: "#FF4E00",
    padding: 5,
    fontWeight: "bold"
  },
  menu: {
    backgroundColor: "#FFAC81",
    margin: 5,
    borderRadius: 20
  },
  item: {
    fontSize: 14,
    margin: 10
  },
  childView: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 0
  },
  button: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white"
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: "cover"
  },
  textStyle: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    marginTop: 15
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 12,
    color: "#000"
  },
  question: {
    alignSelf: "flex-start"
  },
  answer: {
    alignSelf: "flex-end"
  },
  extraDetails: {
    flexDirection: "row",
    flex: 2
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    opacity: 0.1,
    marginLeft: 10,
    marginRight: 10
  }
});
