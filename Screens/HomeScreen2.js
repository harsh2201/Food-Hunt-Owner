import React, { Component } from "react";
import {
  Animated,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  AsyncStorage
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { RFValue } from "react-native-responsive-fontsize";
import { Searchbar } from "react-native-paper";

import Card from "../Components/Card";
import Text from "../data/customText";
import LottieView from "lottie-react-native";
import * as firebase from "firebase";
import Modal from "react-native-modal";

const { height, width } = Dimensions.get("window");

const SLIDERHEIGHT = (3 * height) / 9;
const SEARCHBARHEIGHT = height / 15 + 5;

// const ds = new ListView.DataSource({
//   rowHasChanged: (r1, r2) => {
//     if (r1.name !== r2.name) {
//       return true;
//     }
//   }
// });
export default class ScrollSwagger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      data: [],
      messData: [],
      isModalVisible: false,
      searchQuery: "",
      scrollY: new Animated.Value(0),
      searchResult: []
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

  _storeData = async (key, value) => {
    // try {
    // await AsyncStorage.setItem(key, value);
    // } catch (error) {
    // Error saving data
    // }
  };

  async componentDidMount() {
    // const res = await fetch(
    //   "https://miro.medium.com/max/5040/0*gQj7ECqJQeTqbW1M.png"
    // );
    // const blob = await res.blob();
    // await firebase
    //   .storage()
    //   .ref()
    //   .child("GJ/name")
    //   .put(blob);
    // URL = await firebase
    //   .storage()
    //   .ref()
    //   .child("GJ/name")
    //   .getDownloadURL();
    // console.log("Done");
    // this.setState({ URL: URL });
    this.setState({ isModalVisible: true });
    let fav = [];
    await firebase
      .database()
      .ref("Users/" + firebase.auth().currentUser.uid + "/fav/")
      .on("value", snapshot2 => {
        let snap2 = JSON.stringify(snapshot2);
        let data2 = JSON.parse(snap2);
        for (key in data2) {
          if (data2[key] === true) {
            fav.push(key);
          }
        }
      });
    await firebase
      .database()
      .ref("Owner/")
      .on(
        "value",
        async function(snapshot) {
          let snap = JSON.stringify(snapshot);
          data = JSON.parse(snap);
          let te = [];
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
              views: element.views,
              fav: fav.includes(element.Credentials.mid) ? true : false
            });
          }
          // console.log(te);
          let topViews = this.calcViews(te).slice(0, 5);
          // console.log(topViews);
          // this.setState({
          //   messData: ds.cloneWithRows([])
          // });
          // let data = ds.cloneWithRows(te);
          // this._storeData("messData", te);
          await AsyncStorage.setItem("messData", JSON.stringify(te));
          this.setState({
            data: te,
            messData: te,
            topViews: topViews,
            isModalVisible: false
          });
          // console.log("MessData ", this.state.messData);
        }.bind(this)
      );
  }

  // componentWillUnmount() {
  //   this.setState({
  //     isModalVisible: false
  //   });
  // }

  searchAction = query => {
    let searchResult = this.state.data.filter(item => {
      return item.name.includes(query);
    });
    // console.log(searchResult);
    // this.setState({
    //   messData: ds.cloneWithRows([])
    // });
    this.setState({
      messData: searchResult
    });
    // console.log(this.state.messData.getRowData);
    // this.setState({
    // });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // renderRow = () => {
  //   this.state.messData.map((rowData, key) => {
  //     console.log("rowData", rowData);
  //     return (
  //       <TouchableOpacity
  //         onPress={() => {
  //           this.props.navigation.navigate("MessDetail", { mess: rowData });
  //         }}
  //       >
  //         <Card liked={false} messData={rowData} />
  //       </TouchableOpacity>
  //     );
  //   });
  // };

  _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("MessDetail", { mess: item });
        }}
        style={styles.item}
      >
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
            height: SLIDERHEIGHT,
            backgroundColor: "#00000050",
            position: "absolute",
            justifyContent: "center"
            // alignItems: "center"
          }}
        >
          <Text
            style={{ fontSize: RFValue(28), color: "#fff", paddingLeft: 10 }}
          >
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
            <Text
              style={{
                fontSize: RFValue(13),
                color: "#fff",
                alignSelf: "center"
              }}
            >
              {item.views}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    var headMov = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [0, -180, -180]
    });
    var searchMov = this.state.scrollY.interpolate({
      inputRange: [0, 180, 181],
      outputRange: [
        SLIDERHEIGHT + 15,
        StatusBar.currentHeight,
        StatusBar.currentHeight
      ]
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
          source={require("../assets/back1.png")}
        >
          {/* List Items */}
          {this.state.isModalVisible ? (
            <View />
          ) : (
            <View style={{}}>
              {/* <ListView
                key={"dcdcd"}
                dataSource={this.state.messData}
                renderRow={this.renderRow.bind(this)}
                renderScrollComponent={this.renderScroll.bind(this)}
              /> */}
              {this.renderScroll()}
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
              paddingTop: StatusBar.currentHeight,
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
                  this.searchAction(query);
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
                  activeOpacity={1}
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
          {this.state.isModalVisible ? (
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
          ) : (
            <View />
          )}
        </ImageBackground>
      </View>
    );
  }
  _handleScroll(e) {
    // console.log(e.nativeEvent.contentOffset.y, "jvjhvhm");
  }

  renderScroll() {
    return (
      <Animated.ScrollView
        // {...props}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: SLIDERHEIGHT + SEARCHBARHEIGHT + height / 20,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 20
          // height: 1000
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
      >
        {this.state.messData.map((rowData, key) => {
          {
            /* console.log("rowData", rowData); */
          }
          return (
            <TouchableOpacity
              key={rowData.name}
              onPress={() => {
                this.props.navigation.navigate("MessDetail", { mess: rowData });
              }}
            >
              <Card liked={false} messData={rowData} key={rowData.name} />
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: width - 30,
    height: SLIDERHEIGHT,
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
