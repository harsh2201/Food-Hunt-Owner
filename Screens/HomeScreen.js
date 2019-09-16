import React from "react";
import Text from "../data/customText";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Carousel from "react-native-anchor-carousel";
import { SearchBar } from "react-native-elements";
import { Container, Card, Picker } from "native-base";
import * as firebase from "firebase";
//import {Icon} from 'react-native-vector-icons ';

export default class HomeScreen extends React.Component {
  state = {
    search: "",
    language: "",
    user: []
  };

  componentDidMount() {
    firebase
      .database()
      .ref("Owner/")
      .on(
        "value",
        async function(snapshot) {
          let snap = JSON.stringify(snapshot);
          data = JSON.parse(snap);
          var te = [];
          // console.log(te);
          var rat = 1;
          for (const key in data) {
            const element = data[key];
            // console.log(element);
            te.push({
              name: element.name,
              mid: element.Credentials.mid,
              mid: element.Credentials.mid,
              time: element.time.lunch.open + " - " + element.time.lunch.close,
              email: element.Contact.email,
              mobileNo: element.Contact.mobileNo,
              profileUrl: element.profileUrl,
              limited: element.limited,
              address: element.address,
              avgCost: element.avgCost,
              views: element.views
            });
          }
          this.setState({
            user: te
          });
          // console.log(this.state.data);
        }.bind(this)
      );
  }

  user = [
    {
      name: "Gujarati Food",
      time: "11:00 AM",
      EndTime: "1:00 PM",
      Quantity: "Limited",
      images: "https://bit.ly/CZHarshAvatar"
    },
    {
      name: "Mexican Food",
      time: "11:00 AM",
      EndTime: "1:00 PM",
      Quantity: "Limited",
      images: "https://bit.ly/CZShivamAvatar"
    },
    {
      name: "Punjabi Food",
      time: "11:00 AM",
      EndTime: "1:00 PM",
      Quantity: "Limited",
      images: "https://bit.ly/CZHarshAvatar"
    },
    {
      name: "Punjabi Food",
      time: "11:00 AM",
      EndTime: "1:00 PM",
      Quantity: "Limited",
      images: "https://bit.ly/CZShivamAvatar"
    }
  ];

  data = [
    {
      label: "Filter",
      value: "filter"
    },
    {
      label: "Ratings",
      value: "ratings"
    },
    {
      label: "Limited",
      value: "limited"
    },
    {
      label: "UnLimited",
      value: "unlimited"
    }
  ];

  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        {/* header */}
        {/* <View>
          <Text style={styles.header}>FoodHunt</Text>
        </View> */}

        {/* scroll view of messes */}
        <View style={styles.card}>
          <Container>
            <View>
              <ScrollView horizontal={true}>
                <View
                  style={{
                    height: hp("30%"),
                    width: wp("98%"),
                    alignItems: "center",
                    borderWidth: 1,
                    marginRight: wp("1%")
                  }}
                >
                  <Image
                    source={{
                      uri: "https://static.toiimg.com/photo/54327253/.jpg"
                    }}
                    style={{ height: hp("30%"), width: wp("100%") }}
                  />
                </View>
                <View
                  style={{
                    height: hp("30%"),
                    width: wp("100%"),
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    marginRight: wp("1%")
                  }}
                >
                  <Image
                    source={{
                      uri:
                        "https://images.jdmagicbox.com/comp/mumbai/q9/022pxx22.xx22.151008134200.e2q9/catalogue/classic-veg-restaurant-andheri-east-mumbai-north-indian-restaurants-zoxgrjqtkx.jpg"
                    }}
                    style={{ height: hp("30%"), width: wp("100%") }}
                  />
                </View>
                <View
                  style={{
                    height: hp("30%"),
                    width: wp("100%"),
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    marginRight: wp("1%")
                  }}
                >
                  <Image
                    source={{
                      uri:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcWklNlXX5vdSGJCygIaPbo3bSH8SS3gMCAs-MTp7H8T5MiL0u"
                    }}
                    style={{ height: hp("30%"), width: wp("100%") }}
                  />
                </View>
              </ScrollView>
            </View>
          </Container>
        </View>

        {/* search and filter portion */}
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View style={styles.search_s}>
            <SearchBar
              lightTheme
              icon={{ type: "font-awesome", name: "search" }}
              placeholder="Type Here..."
            />
          </View>

          <View
            style={{
              width: "60%",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Picker
              mode="dropdown"
              style={{
                height: hp("7%"),
                backgroundColor: "white",
                width: "14%",
                justifyContent: "center"
              }}
            >
              {this.data.map(item => {
                return (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        {/* mess list display */}
        <ScrollView style={styles.body}>
          <Card title="CARD WITH DIVIDER">
            {this.state.user.map((u, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("MessDetail", { mess: u });
                  }}
                  key={i}
                  style={styles.card_unit}
                >
                  <Image
                    resizeMode="cover"
                    source={{ uri: u.profileUrl }}
                    style={{
                      height: hp("10%"),
                      width: wp("20%"),
                      borderRadius: 20
                    }}
                  />
                  <View
                    style={{ flex: 1, flexDirection: "column", margin: 15 }}
                  >
                    <Text style={{ fontWeight: "500", fontSize: 17 }}>
                      {u.name}
                    </Text>
                    <Text style={{ color: "grey", fontSize: 12 }}>
                      {u.time}
                    </Text>
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {u.limited ? "Limited" : "Unlimited"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: "column"
  },
  card_unit: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 15
  },
  search_s: {
    height: hp("7%"),
    width: wp("73%")
  },
  dropdown: {
    height: hp("7%"),
    width: wp("15%")
  },
  card: {
    height: hp("30%"),
    width: wp("98%"),
    alignSelf: "center"
  },
  body: {
    height: hp("55%"),
    width: wp("100%")
  },
  header: {
    backgroundColor: "black",
    height: hp("9%"),
    width: wp("100%"),
    color: "white",
    textAlign: "center",
    fontSize: hp("3%"),
    paddingTop: hp("3%")
  },
  carousel_s: {
    height: hp("2%"),
    width: wp("100%"),
    color: "red",
    fontSize: hp("10%")
  },
  footer: {
    backgroundColor: "black",
    height: hp("5%"),
    width: wp("100%"),
    color: "red",
    textAlign: "center",
    fontSize: hp("4%")
  },
  footer1: {
    height: hp("5%"),
    fontSize: hp("2%"),
    color: "white",
    justifyContent: "center",
    alignSelf: "center"
  }
});
