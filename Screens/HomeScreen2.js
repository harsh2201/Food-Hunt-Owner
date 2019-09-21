import React, { Component } from "react";
import {
  Animated,
  View,
  ListView,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Searchbar } from "react-native-paper";

import Card from "../Components/Card";
import Text from "../data/customText";
import LottieView from "lottie-react-native";
import * as firebase from "firebase";
import Modal from "react-native-modal";

const { height, width } = Dimensions.get("window");

const SLIDERHEIGHT = (3 * height) / 10;
const SEARCHBARHEIGHT = height / 15 + 5;

const item = [];
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => {
    if (r1.name !== r2.name) {
      return true;
    }
  }
});
export default class ScrollSwagger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      messData: ds.cloneWithRows([]),
      isModalVisible: true,
      searchQuery: "",
      scrollY: new Animated.Value(0),
      dataSource: ds.cloneWithRows([
        true,
        false,
        true,
        false,
        true,
        false,
        true
      ])
    };
  }

  calcViews = data => {
    return data.sort((a, b) => {
      if (b.views > a.views) {
        return true;
      } else {
        return false;
      }
    });
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
          let topViews = this.calcViews(te).slice(0, 5);
          console.log(topViews);
          let data = ds.cloneWithRows(te);
          this.setState({
            messData: data,
            topViews: topViews,
            isModalVisible: false
          });
          // console.log("MessData ", this.state.messData);
        }.bind(this)
      );
  }

  searchAction = () => {};

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  renderRow(rowData) {
    return <Card liked={false} messData={rowData} />;
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.profileUrl }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.85}
          {...parallaxProps}
        />
        <View
          style={{
            width: width - 30,
            height: width - 60,
            backgroundColor: "#00000050",
            position: "absolute",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 35, color: "#fff", paddingLeft: 10 }}>
            {item.name}
          </Text>
          <View style={{ flexDirection: "row", paddingLeft: 10 }}>
            <LottieView
              style={{
                width: "10%"
              }}
              source={require("../assets/Lottie/eye.json")}
              autoPlay={true}
            />
            <Text style={{ fontSize: 20, color: "#fff", alignSelf: "center" }}>
              {item.views}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    var headMov = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [0, -180, -180]
    });
    var searchMov = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [SLIDERHEIGHT + 15, 10, 10]
    });
    var searchCorner = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [14, 6, 6]
    });
    var searchHeight = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [SEARCHBARHEIGHT, SEARCHBARHEIGHT + 20, SEARCHBARHEIGHT + 20]
    });
    var searchMarginH = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [18, 9, 9]
    });
    var imgOp = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [1, 0, 0]
    });
    var headColor = this.state.scrollY.interpolate({
      inputRange: [80, 100, 180],
      outputRange: ["white", "white", "white"]
    });
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/loginBack.png")}
        >
          {/* List Items */}
          {this.state.isModalVisible ? (
            <View />
          ) : (
            <View style={{}}>
              <ListView
                dataSource={this.state.messData}
                renderRow={this.renderRow.bind(this)}
                renderScrollComponent={this.renderScroll.bind(this)}
              />
            </View>
          )}
          {/* Top Image Slider */}
          <Animated.View
            style={{
              position: "absolute",
              height: SLIDERHEIGHT,
              width: width,
              top: 0,
              zIndex: 0,
              opacity: imgOp,
              // backgroundColor: headColor,
              justifyContent: "flex-end",
              flexDirection: "column",
              transform: [{ translateY: headMov }]
            }}
          >
            {this.state.isModalVisible ? (
              <View />
            ) : (
              <Carousel
                sliderWidth={width}
                sliderHeight={width}
                itemWidth={width - 30}
                data={this.state.topViews}
                renderItem={this._renderItem}
                hasParallaxImages={true}
              />
            )}
          </Animated.View>

          {/* Search Bar */}
          <Animated.View
            style={{
              position: "absolute",
              zIndex: 100,
              height: searchHeight,
              width: width,
              // backgroundColor: "white",
              justifyContent: "flex-end",
              flexDirection: "column",
              transform: [{ translateY: searchMov }]
            }}
          >
            <Animated.View
              style={{
                flex: 1,
                flexDirection: "row",
                // backgroundColor: "white",
                borderRadius: searchCorner,
                margin: 5,
                marginHorizontal: searchMarginH
              }}
            >
              <Searchbar
                style={{ flex: 6 }}
                placeholder="Search"
                onChangeText={query => {
                  this.setState({ searchQuery: query });
                }}
                value={this.state.searchQuery}
              />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 10
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    // height: height / 15,
                    // width: height / 15,
                    backgroundColor: "white",
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("../assets/filter.png")}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
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
                autoPlay={true}
                loop={true}
              />
            </View>
          </Modal>
        </ImageBackground>
      </View>
    );
  }
  _handleScroll(e) {
    // console.log(e.nativeEvent.contentOffset.y, "jvjhvhm");
  }

  renderScroll(props) {
    return (
      <Animated.ScrollView
        {...props}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: SLIDERHEIGHT + SEARCHBARHEIGHT + height / 20,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 20
          // backgroundColor: "red"
        }}
        // Declarative API for animations ->
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: this.state.scrollY }
              }
            }
          ],
          { listener: this._handleScroll.bind(this) },
          {
            useNativeDriver: true
          }
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: width - 30,
    height: width - 60,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 8
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
  },
  loader: {
    flex: 1
  }
});
