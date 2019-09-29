import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  StatusBar
} from "react-native";
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import Expo from "expo";
// import { Google } from "expo";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import * as firebase from "firebase";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      progress: new Animated.Value(0)
    };
  }

  async componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 2500,
          easing: Easing.linear
        })
      ])
    ).start();
    // setTimeout(() => {
    //   this.setState({
    //     isModalVisible: true
    //   });
    //   this.animation.play();
    // }, 3000);
    // setTimeout(() => {
    //   this.setState({
    //     isModalVisible: false
    //   });
    // }, 5000);
  }

  // resetAnimation = () => {
  //   this.animation.reset();
  //   this.animation.play();
  // };

  _googleLogin = async () => {
    this.setState({
      isModalVisible: true
    });
    const config = {
      iosClientId:
        "582949090874-ja581d26b6gknkpte829erf01f225nar.apps.googleusercontent.com",
      androidClientId:
        "582949090874-d61tbk9grekrjveqiv68ehu2es4mtq8e.apps.googleusercontent.com"
    };
    const result = await Google.logInAsync(config);
    const { type, user, accessToken, idToken } = result;

    if (type === "success") {
      var credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          this.setState({
            isModalVisible: false
          });
          // setTimeout(() => {

          // }, 00);
          console.log(error);
        });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          var database = firebase.database();
          // console.log(user);
          database.ref("Users/" + user.uid + "/").update({
            name: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            email: user.email,
            type: "google"
          });
          this.props.navigation.navigate("Navigator");
        }

        // setTimeout(() => {
        //   this.setState({
        //     isModalVisible: false
        //   });

        // }, 00);
      });
    } else {
      this.setState({
        isModalVisible: false
      });
    }
  };

  _fbLogin = async () => {
    this.setState({
      isModalVisible: true
    });
    // this.animation.play();
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "2917030818370588",
      {
        permissions: ["public_profile"]
      }
    );
    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          this.setState({
            isModalVisible: false
          });
          console.log(error);
        });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          var database = firebase.database();
          // console.log(user);
          // console.log(firebase.auth().currentUser);
          database.ref("Users/" + user.uid + "/").update({
            name: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            email: user.email,
            type: "fb"
          });
        }
        this.setState({
          isModalVisible: false
        });
        // setTimeout(() => {

        // }, 0);
      });
    } else {
      this.setState({
        isModalVisible: false
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1, justifyContent: "space-around" }}
          source={require("../assets/loginBack.png")}
        >
          <View
            style={{
              height: (1.5 * screenHeight) / 7,
              // backgroundColor: "red",
              marginTop: StatusBar.currentHeight
            }}
          >
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require("../assets/foodHuntLogo.png")}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              height: (3 * screenHeight) / 7
              // backgroundColor: "yellow"
            }}
          >
            <LottieView
              style={{ flex: 1 }}
              source={require("../assets/Lottie/office.json")}
              // progress={this.state.progress}
              speed={3}
              autoPlay={true}
              loop={true}
            />
          </View>
          <View
            style={{
              height: screenHeight / 7,
              width: screenWidth - 50,
              // backgroundColor: "black",
              alignSelf: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                // backgroundColor: "black",
                justifyContent: "flex-end"
                // marginBottom: 40
              }}
            >
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.buttonText}
                  onPress={this._fbLogin}
                >
                  <Image
                    style={styles.image}
                    source={require("../assets/facebook.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonText}
                  onPress={this._googleLogin}
                >
                  <Image
                    style={styles.image}
                    source={require("../assets/google.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Modal
          isVisible={this.state.isModalVisible}
          backdropColor="#000"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <LottieView
              style={styles.loader}
              source={require("../assets/Lottie/cooking.json")}
              progress={this.state.progress}
              // autoPlay={true}
              // loop={true}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignSelf: "center",
    // marginTop: screenHeight / 2.6,
    alignSelf: "center",
    backgroundColor: "#ffffffef",
    borderRadius: 10,
    width: screenWidth - 50,
    height: screenHeight / 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13
  },
  logoContainer: {
    // flex: 1,
    height: screenHeight / 6,
    width: screenWidth - 50,
    // justifyContent: "center",
    alignSelf: "center"
  },
  logo: {
    flex: 1,
    resizeMode: "center",
    // margin: 10,
    justifyContent: "flex-start",
    alignSelf: "center"
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    color: "orange",
    fontWeight: "bold"
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    // marginTop: screenHeight / 4.8,
    height: screenHeight / 7,
    width: screenWidth - 50,
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    borderColor: "#fff"
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-start",
    alignSelf: "center"
  },
  buttonText: {
    height: screenHeight / 10,
    width: screenWidth / 2 - 50
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    height: 100,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
