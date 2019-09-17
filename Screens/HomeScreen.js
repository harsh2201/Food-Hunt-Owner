import React from "react";
import Text from "../data/customText";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
  Button
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Carousel from "react-native-anchor-carousel";
import { SearchBar, Rating } from "react-native-elements";
import { Container, Card, Picker } from "native-base";
import * as firebase from "firebase";
import Modal from "react-native-modal";
//import {Icon} from 'react-native-vector-icons ';

export default class HomeScreen extends React.Component {
  state = {
    search: "",
    language: "",
    user: [],
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
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
              time: element.time.lunch.open + " - " + element.time.lunch.close,
              // rating: rat,
              profileUrl: element.profileUrl,
              limited: element.limited
            });
          }
          this.setState({
            user: te
          });
          // console.log(this.state.data);
        }.bind(this)
      );
  }
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
                    marginRight: wp("1%"),
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

        {/* Search portion */}
        <View style={{ flex: 2, flexDirection: "row",height: hp('7%'),paddingTop: hp('1%'),paddingBottom: hp('7%') }}>
          <View style={styles.search_s}>
            <SearchBar
              lightTheme
              placeholder="Search"
              onChangeText={query => { this.setState({ search: query }); }}
              value={search}
            />
          </View>

         {/* Filter */}
          <View
            style={{
              width: "14%",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity onPress={this.toggleModal}>
            <Image source={{
              uri:"https://cdn.iconscout.com/icon/premium/png-256-thumb/filter-30-204031.png"
              }} style={{ height: hp("7%"), width: wp("14%")}} />
            </TouchableOpacity>
            
            <Modal isVisible={this.state.isModalVisible}>
              <View style={{ flex: 2, flexDirection: "row", height: hp('50%'), width: wp('100%') }}>
                <View> 
                  <TouchableOpacity onPress={this.toggleModal} >
                  <Image source={{
                      uri:"https://1001freedownloads.s3.amazonaws.com/vector/thumb/70571/close-button.png"
                      }} style={{ height: hp("5%"), width: wp("5%"),alignSelf: "center"}} />
                  </TouchableOpacity>
                </View>

                <View style={{alignSelf: "center", width: wp('70%'), height: hp('50%'), paddingTop: hp('10%'), paddingLeft: wp('10%')}}>
                  <Button title="Ratings" style={{height: hp('40%'), width: wp('100%'), textAlign: "center"}} />
                  <Button title="Limited" style={{height: hp('40%'), width: wp('100%'), textAlign: "center"}} />
                  <Button title="Unlimited" style={{height: hp('40%'), width: wp('100%'), textAlign: "center"}} />
                  <Button title="Nearest" style={{height: hp('40%'), width: wp('100%'), textAlign: "center"}} />
                </View> 

              </View>
            </Modal>
            
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
  modal:{
    height: hp('40%'),
    width: wp('100%'),
    justifyContent: "center",
    alignSelf: "center"
  },
  card_unit: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 15
  },
  search_s: {
    height: hp("7%"),
    width: wp("85%")
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
