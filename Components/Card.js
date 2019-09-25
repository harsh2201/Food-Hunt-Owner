import React, { Component } from "react";
import {
  Easing,
  Animated,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";

import Text from "../data/customText";
import LottieView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as firebase from "firebase";

const { height, width } = Dimensions.get("window");
const CARDHEIGHT = height / 3;

class Card extends Component {
  liked = this.props.messData.fav;
  messData = this.props.messData;

  constructor(props) {
    super(props);
    this.state = {
      heartProgress: this.liked ? new Animated.Value(1) : new Animated.Value(0)
    };
  }

  onPressHeart = async row => {
    let uid = firebase.auth().currentUser.uid;
    if (row) {
      Animated.timing(this.state.heartProgress, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();
      this.liked = false;
      firebase
        .database()
        .ref("Users/" + uid + "/fav/")
        .update({ [this.messData.mid]: false });
    } else {
      Animated.timing(this.state.heartProgress, {
        toValue: 1,
        duration: 600,
        easing: Easing.quad
      }).start();
      this.liked = true;
      firebase
        .database()
        .ref("Users/" + uid + "/fav/")
        .update({ [this.messData.mid]: true });
    }
  };

  render() {
    return (
      <View
        style={{
          width: width - 40,
          height: CARDHEIGHT,
          marginVertical: 10,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,
          elevation: 11
        }}
      >
        {/* <Text>{rowData}</Text> */}
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            // backgroundColor: "red",
            borderRadius: 25
          }}
        >
          <Image
            style={{
              // flex: 1,
              height: "65%",
              width: "100%",
              resizeMode: "cover",
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25
            }}
            source={{
              uri: this.messData.profileUrl
            }}
          />
          <View
            style={{
              height: "35%",
              width: "100%",
              // marginTop: 10,
              // alignItems: "center",
              // justifyContent: "center",
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              flexDirection: "row"
              // backgroundColor: "#fff"
            }}
          >
            <View
              style={{
                paddingLeft: 25,
                flex: 8,
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: RFValue(19) }}>
                {this.messData.name}
              </Text>
              <Text style={{ fontSize: RFValue(15) }}>
                {this.messData.time}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 3,
                // backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                this.onPressHeart(this.liked);
              }}
            >
              <LottieView
                key={this.messData.name}
                style={{
                  height: "80%",
                  width: "80%",
                  // backgroundColor: "#fff",
                  alignSelf: "center",
                  justifyContent: "center"
                }}
                source={require("../assets/Lottie/heart8.json")}
                progress={this.state.heartProgress}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default Card;
