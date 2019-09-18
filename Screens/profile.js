import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import React from "react";
import * as firebase from "firebase";
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
export default class profile extends React.Component {
  constructor() {
    super();
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
    alert("Sign Out");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
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

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.SignOut}
            >
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    height: (screenHeight * 4) / 10,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: (screenHeight * 4) / 10 - 65
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40,
    height: (screenHeight * 6) / 10
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
    //marginTop: 150,
    height: 30,
    //flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: (screenHeight * 3) / 10,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#F75728"
  }
});
