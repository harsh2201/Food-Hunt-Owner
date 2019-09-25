import {
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import React from "react";
import * as firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
// import GradientButton from "react-native-gradient-buttons";
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
export default class profile extends React.Component {
  constructor() {
    super();
    this.SignOut = this.SignOut.bind(this);
  }

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAOKUYgOO6Kedxa0hrS7VzWHaG7n8CXyv8",
      authDomain: "firstdemo-c6659.firebaseapp.com",
      databaseURL: "https://firstdemo-c6659.firebaseio.com",
      projectId: "firstdemo-c6659",
      storageBucket: "",
      messagingSenderId: "1008789145023",
      appId: "1:1008789145023:web:1c2de7959e8efea6"
    };
    firebase.initializeApp(firebaseConfig);

    var user = firebase.auth().currentUser;
    console.log(user);
  }
  SignOut = () => {
    // alert("Sign Out");
    console.log("hello");
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.header}
            source={require("../assets/loginBack.png")}
          />
        </View>

        <Image
          style={styles.image}
          source={{
            uri:
              "https://cache.desktopnexus.com/thumbseg/977/977172-bigthumbnail.jpg"
          }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Vidhya Kothadia</Text>
            {/* <GradientButton
              onPressAction={
                (this.SignOut = () => {
                  alert("Sign Out");
                })
              }
              style={styles.buttonContainer}
              text="Sign Out "
              textStyle={{ fontSize: 20 }}
              gradientBegin="#FFD801"
              gradientEnd="#F87217"
              gradientDirection="horizontal"
              width={100}
              height={40}
              radius={15}
              impact
              impactStyle="Light"
              //onPress={this.SignOut}
            /> */}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 4,
    backgroundColor: "#ecf0f1"
  },

  photo: {
    flex: 1,
    resizeMode: "cover"
  },
  header: {
    //backgroundColor: "#F75728",
    height: (screenHeight * 4) / 10,
    width: screenWidth
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    //borderColor: "white",
    marginBottom: 10,
    position: "absolute",
    marginTop: (screenHeight * 4) / 10 - 65,
    marginLeft: (screenWidth * 1) / 10
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
    position: "absolute",
    marginLeft: (screenWidth * 1) / 10 - 65
  },
  body: {
    marginTop: 40,
    height: (screenHeight * 6) / 10
  },
  bodyContent: {
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
    //marginTop: 150,
    height: 40,
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: (screenHeight * 3) / 10,
    marginLeft: (screenWidth * 4) / 10,
    width: 100
  }
});
