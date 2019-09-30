import React, { Component } from "react";
// import * as Font from "expo-font";
import * as firebase from "firebase";

import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView
} from "react-native";
import Text from "../data/customText";
import { Card } from "native-base";
import reviewScreen from "./reviewScreen.js";
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation-stack";
var varCurrentRating;

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
class MessDetail extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: true,
      Default_Rating: 2,
      Max_Rating: 5,
      children: [],
      messOwner: [],
      user: [],
      activeItemIndex: 0,
      unlimted: true,
      limited: false,
      rating_mess: 0,
      total_users: 0,
      current_rating: 0,
      NUser: 0,
      views: 0
    };
    this.Star =
      "http://aboutreact.com/wp-content/uploads/2018/08/star_filled.png";

    this.Star_With_Border =
      "http://aboutreact.com/wp-content/uploads/2018/08/star_corner.png";
  }

  async componentDidMount() {
    const { navigation } = this.props;
    let data = navigation.getParam("mess");

    this.setState({
      views: data.views
    });

    let views = await firebase.database().ref("Owner/" + data.mid + "/views");
    views.transaction(function(currView) {
      // console.log("Views", currView);
      return currView + 1;
    });
    views.on("value", snapshotV => {
      let snap = JSON.stringify(snapshotV);
      let views = JSON.parse(snap);
      this.setState({
        views: views
      });
    });

    // console.log(data);
    firebase
      .database()
      .ref("Menu/" + data.mid + "/")
      .on(
        "value",
        async function(snapshot) {
          let snap = JSON.stringify(snapshot);
          data_mess = JSON.parse(snap);
          // console.log("Data messs", data_mess);
          var te = [];
          // console.log("TE", te);
          for (const dinn_lun in data_mess) {
            const name = dinn_lun;
            const element = data_mess[dinn_lun];
            // console.log("Image element", element);
            for (const imageUrl in element) {
              te.push({
                time: name,
                imageUrl: element[imageUrl]
              });
            }
          }
          this.setState({
            messOwner: te
          });
          //console.log(this.state.data);
        }.bind(this)
      );
    firebase
      .database()
      .ref("Rating/" + data.mid + "/" + "Users/")
      .on(
        "value",
        async function(snapshot) {
          this.setState({
            total_users: snapshot.numChildren()
          });
        }.bind(this)
      );

    firebase
      .database()
      .ref("Rating/" + data.mid + "/")
      .on("value", snapshot => {
        let rating_data_mess = JSON.parse(JSON.stringify(snapshot));
        this.setState({
          current_rating: rating_data_mess["rating"],
          NUser: rating_data_mess["count"]
        });
      })
      .bind(this);
  }
  static navigationOptions = {
    header: null
  };

  UpdateRating(key) {
    this.setState({ Default_Rating: key });
  }

  render() {
    const { navigation } = this.props;
    let data = navigation.getParam("mess");
    //console.log(data);

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

    //console.log(userId);
    firebase
      .database()
      .ref("Rating/" + data.mid + "/")
      .update({
        count: this.state.total_users
      });
    // console.log("Main current rating: " + this.state.current_rating);
    // console.log("Current user: " + this.state.NUser);
    return (
      <View style={styles.safeArea}>
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
                <Text style={styles.messName}>{data.name}</Text>
                <Text style={styles.smallDetails}>{data.time}</Text>
              </View>

              <View style={styles.rating}>
                <View style={styles.subrat}>
                  <Image
                    source={require("../assets/star.png")}
                    style={{ height: 18, width: 18 }}
                  />
                  <Text style={{ color: "#FF4E00", fontWeight: "bold" }}>
                    {this.state.current_rating}
                  </Text>
                </View>
                <View style={styles.subrat}>
                  <Image
                    source={require("../assets/eye.png")}
                    style={{ height: 18, width: 18 }}
                  />
                  <Text
                    style={{
                      color: "#FF4E00"
                      // fontWeight: "bold",
                      // textStyle: "italic"
                    }}
                  >
                    {this.state.views}
                  </Text>
                </View>
              </View>

              {/* <View></View> */}
            </View>
            <View>
              <Text style={styles.title}>Menu</Text>
            </View>
            <ScrollView>
              <Card title="MENU ITEMS">
                {this.state.messOwner.map((u, i) => {
                  return (
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      <Text>{u.time}</Text>
                      <Image
                        style={{ height: 250, width: screenWidth }}
                        source={{ uri: u.imageUrl }}
                      />
                    </View>
                  );
                })}
              </Card>
            </ScrollView>

            <View>
              <Text style={styles.title}>Rate Us</Text>

              <View style={styles.childView}>{React_Native_Rating_Bar}</View>
              <Text style={styles.textStyle}>
                {this.state.Default_Rating} / {this.state.Max_Rating}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => {
                  firebase
                    .database()
                    .ref(
                      "Rating/" +
                        data.mid +
                        "/" +
                        "Users/" +
                        firebase.auth().currentUser.uid +
                        "/"
                    )
                    .update({
                      rated: this.state.Default_Rating
                    });
                  firebase
                    .database()
                    .ref("Rating/" + data.mid + "/")
                    .on("value", snapshot => {
                      // console.log("Rated rating: " + this.state.Default_Rating);
                      // console.log("Current Users: " + this.state.NUser);

                      varCurrentRating =
                        (this.state.current_rating * this.state.NUser +
                          this.state.Default_Rating) /
                        (this.state.NUser + 1);
                      varCurrentRating = varCurrentRating.toFixed(1);
                      // console.log(
                      //   "After Updation of Rating: " + varCurrentRating
                      // );
                    })
                    .bind(this);
                  firebase
                    .database()
                    .ref("Rating/" + data.mid)
                    .update({
                      rating: varCurrentRating
                    });
                }}
              >
                <Text>{this.state.Default_Rating}</Text>
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
                onPress={() => this.props.navigation.navigate("reviewScreen")}
              >
                <Text>See all reviews</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
export default createStackNavigator(
  {
    mess: MessDetail,
    reviewScreen: reviewScreen
  },
  {
    initialRouteName: "mess"
  }
);

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
    width: screenHeight / 3,
    alignSelf: "center",
    backgroundColor: "#000000",
    zIndex: 1,
    position: "absolute",
    borderRadius: 30,
    marginTop: screenHeight / 8
  },
  messImage1: {
    height: screenHeight / 3,
    width: screenHeight / 3,
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
  subhead: {
    fontSize: 18,
    fontWeight: "500"
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
    width: screenWidth / 2,
    borderWidth: 1,
    fontWeight: "bold",
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
