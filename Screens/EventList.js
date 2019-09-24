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
    var db = firebase.database();
    var data;
    var temp = [];

    db.ref("Owner/").on(
      "value",
      async function(snapshot) {
        let snap = JSON.stringify(snapshot);
        data = JSON.parse(snap);
        var rat = 1;
        var te = [
          {
            name: "",
            limited: "",
            mid: "",
            unlimited: "",
            rating: ""
          }
        ];

        for (const key in data) {
          var child = [];
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            var rating = 0;
            //console.log(element);
            db.ref("Rating/" + data[key].Credentials.mid).on(
              "value",
              async function(snapshot) {
                let snap = JSON.stringify(snapshot);
                rating_data = JSON.parse(snap);
                console.log(rating_data.total);
                var count = 0;
                for (const key in rating_data.user) {
                  if (rating_data.user.hasOwnProperty(key)) {
                    const element = rating_data.user[key];
                    count = count + 1;
                  }
                }
                console.log(count);
                rating = rating_data.total / count;
                console.log(rating);
                // console.log(data[key].name);
                te.push({
                  name: data[key].name,
                  limited: data[key].limited.toString(),
                  unlimited: data[key].unlimited.toString(),
                  rating: rating,
                  mid: data[key].Credentials.mid
                });
              }.bind(this)
            );
          }
        }

        this.setState({
          data: te
        });
        console.log(this.state.data);
        //console.log("Main:" + this.state.data);
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
  Filter_limited = () => {
    var temp = this.state.data;

    const result = temp.filter(word => word.limited.match("true"));
    console.log("Limited");
    console.log(result);
  };
  Filter_Unlimited = () => {
    var temp = this.state.data;
    //var t = true;
    const result = temp.filter(word => word.unlimited.match("true"));
    console.log("UNLimited");
    console.log(result);
  };
  Rating = () => {
    var temp = this.state.data;
    function Comparator(a, b) {
      if (a.rating < b.rating) return -1;
      if (a.rating > b.rating) return 1;
      return 0;
    }
    temp = temp.sort(Comparator);
    console.log(temp);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        <Text>Hellooo.......Vidhya!</Text>
        <SearchBar
          placeholder="Type Here..."
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.search}
        />
        <Button onPress={this.Filter_limited} title="limited"></Button>
        <Button onPress={this.Filter_Unlimited} title="Unlimited"></Button>
        <Button onPress={this.Rating} title="Rating"></Button>
      </View>
    );
  }
}
