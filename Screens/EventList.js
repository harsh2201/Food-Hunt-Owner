import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import firebase, { database } from "firebase";
import * as firebase from "firebase";
import { SearchBar } from "react-native-elements";
export default class EventList extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      data: "",
      search: "",
      array: [
        {
          name: "",
          uid: "",
          date: ""
        }
      ]
    };
    this.searchFilterFunction = this.searchFilterFunction.bind(this);
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
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase
      .database()
      .ref("Dummy/")
      .push({
        Credentials: {
          Name: "karan"
        }
      });

    var data;
    firebase
      .database()
      .ref("Dummy/")
      .on(
        "value",
        async function(snapshot) {
          let snap = JSON.stringify(snapshot);
          data = JSON.parse(snap);

          var te = [
            {
              name: "",
              uid: "",
              date: "",
              rating: ""
            }
          ];

          console.log(te);
          var temp = [];

          var rat = 1;
          //var j = 0, i = 0;
          for (const key in data) {
            var child = [];
            if (data.hasOwnProperty(key)) {
              const element = data[key];
              //console.log(element);

              te.push({
                name: data[key].Credentials.Name,
                uid: data[key].Credentials.UID,
                date: "22/02/22",
                rating: rat
              });
              rat = rat + 1;
            }
          }

          // Object.keys(data).map(key=>(
          //   //console.log(key)
          //   t.push(key)
          // ))
          this.setState({
            data: te
          });
          console.log(this.state.data);
        }.bind(this)
      );
  }
  searchFilterFunction = text => {
    var temp = this.state.data;
    this.setState({ search: text });
    console.log(
      `SEARCH STRING :${text}                                                                  `
    );
    const result = temp.filter(
      word => word.name.match(text) || word.name.match(text.toLowerCase())
    );
    console.log(result);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Hellooo.......Vidhya!</Text>
        <SearchBar
          placeholder="Type Here..."
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.search}
        />
      </View>
    );
  }
}
