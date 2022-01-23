import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { LogBox } from 'react-native';
import { Provider as ReactPaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux';
import { theme } from './src/utils/theme';
import MainNavigation from './src/navigation/index';

export default App = () => {

    LogBox.ignoreLogs([
        "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ]);
    return (
        <ReduxProvider store={store}>
             <ReactPaperProvider theme={theme}> 
                <NavigationContainer>
                    <MainNavigation />
                </NavigationContainer>
            </ReactPaperProvider> 
        </ReduxProvider>
    )
}


// import React, { Component, useEffect } from "react";
// import {
//   Platform,
//   SafeAreaView,
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   PermissionsAndroid,
//   TextInput,
//   TouchableHighlight
// } from "react-native";


// import MapView, {
//   Marker,
//   AnimatedRegion,
//   PROVIDER_GOOGLE,
//   Polyline,
//   Circle,
//   MarkerAnimated
// } from "react-native-maps";
// import Geolocation from 'react-native-geolocation-service';
// import haversine from "haversine";
// import MapViewDirections from 'react-native-maps-directions';

// import io from "socket.io-client";



// const SOCKET_URL = `https://b470-2405-201-e017-3bbb-706b-ba75-50e3-a982.ngrok.io`;
// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
// const LATITUDE_DELTA = 0.0021;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// export default class App extends Component {
//   state = {
//     destinationLatitude: 11.004254207994313,
//     destinationLongitude: 77.01504359623311,
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//     routeCoordinates: [],
//     distanceTravelled: 0,
//     startLatitude: LATITUDE,
//     startLongitude: LONGITUDE,
//     prevLatLng: {},
//     coordinate: new AnimatedRegion({
//       latitude: LATITUDE,
//       longitude: LONGITUDE
//     }),
//     loading: true,
//     isDestinyPicked: false,
//     console: "",
//     isConnected: false,
//   }

//   componentDidMount = async () => {
//     this.socket = io(SOCKET_URL);

//     // console.log(this.socket);

//     const userId = "123456789";

//     const arg1 = {
//       room: userId,
//       name: "Hari"
//     }

//     this.socket.emit("join", arg1);

//     this.socket.on("joined", (arg1) => {
//       console.log("joined", arg1);
//       this.setState({
//         console: arg1
//       })
//     });
//     this.socket.on("sendUpdate", (arg1) => {
//       console.log("updates", arg1);
//       this.setState({
//         console: this.state.console+ " "  + arg1?.coordinate?.latitude + " "
//       })
//     });

//     this.watchLocation();
//   }

//   getMapRegion = () => ({
//     latitude: Number(this.state.latitude),
//     longitude: Number(this.state.longitude),
//     latitudeDelta: Number(LATITUDE_DELTA),
//     longitudeDelta: Number(LONGITUDE_DELTA)
//   });

//   watchLocation = () => {
//     const { coordinate } = this.state;
//     this.watchID = Geolocation.watchPosition(
//       position => {
//         const { routeCoordinates, distanceTravelled } = this.state;
//         const { latitude, longitude } = position.coords;

//         const newCoordinate = {
//           latitude: Number(latitude),
//           longitude: Number(longitude)
//         };

//         if (Platform.OS === "android") {
//           if (this.marker) {
//             this.marker?._component?.animateMarkerToCoordinate(
//               newCoordinate,
//               500
//             );
//           }
//         } else {
//           coordinate.timing(newCoordinate).start();
//         }

//         this.setState({
//           latitude,
//           longitude,
//           loading: false,
//           routeCoordinates: routeCoordinates.concat([newCoordinate]),
//           distanceTravelled:
//             distanceTravelled + this.calcDistance(newCoordinate),
//           prevLatLng: newCoordinate
//         });
//       },
//       error => {
//         console.log(error);
//         alert('Error in getting your location')
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 2000,
//         maximumAge: 3600000,
//         distanceFilter: 10
//       }
//     );
//   };

//   componentWillUnmount = () => {
//     Geolocation.clearWatch(this.watchID);
//   }

//   calcDistance = newLatLng => {
//     const { prevLatLng } = this.state;
//     return haversine(prevLatLng, newLatLng) || 0;
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     // console.log(prevProps,"   " ,prevState)
//     if (this.state.latitude !== prevState.latitude) {
//       this.socket.emit("update", {
//         coordinate: {latitude: this.state.latitude, longitude: this.state.longitude},
//         room: "123456789",
//         user: "Hari"
//       });

//       // this.pubnub.publish({
//       //   message: {
//       //     latitude: this.state.latitude,
//       //     longitude: this.state.longitude,
//       //   },
//       //   channel: 'location',
//       // });
//       // this.socket.emit
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {
//           this.state.isDestinyPicked === false ?
//             <View style={{
//               flex: 1,
//               alignSelf: "center",
//               justifyContent: "center",
//               width: "100%"
//             }}>
//               <TextInput
//                 value={this.state.destinationLatitude + ""}
//                 placeholder="Latitude of your destination."
//                 onChangeText={txt => {
//                   this.setState({
//                     destinationLatitude: txt
//                   })
//                 }}
//                 style={{
//                   marginVertical: 15,
//                   backgroundColor: "white",
//                   width: "80%",
//                   alignSelf: "center",
//                   borderRadius: 5,
//                   paddingLeft: 15,
//                   color: "black"
//                 }}
//                 keyboardType={"number-pad"}
//                 placeholderTextColor={"black"}
//               />
//               <TextInput
//                 value={this.state.destinationLongitude + ""}
//                 placeholder="Longitude of your destination."
//                 onChangeText={txt => {
//                   this.setState({
//                     destinationLongitude: txt
//                   })
//                 }}
//                 style={{
//                   marginVertical: 15,
//                   backgroundColor: "white",
//                   width: "80%",
//                   alignSelf: "center",
//                   borderRadius: 5,
//                   paddingLeft: 15,
//                   color: "black"
//                 }}
//                 keyboardType={"number-pad"}
//                 placeholderTextColor={"black"}
//               />
//               <Text>
//               {JSON.stringify(this.state.console)}
//               </Text>
//               <TouchableOpacity
//                  style={{
//                   marginVertical: 15,
//                   backgroundColor: "#232754",
//                   width: "80%",
//                   alignSelf: "center",
//                   borderRadius: 5,
//                   padding: 15
//                 }}
//                 onPress={()=>{
//                   if(this.state.destinationLatitude || this.state.destinationLongitude)
//                   this.setState({
//                     isDestinyPicked: true
//                   });
//                 }}
//               >
//                 <Text style={{
//                   color: "white",
//                   textAlign: "center"
//                 }}>
//                   Get Directions.
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             :
//             <>
//               <MapView
//                 style={styles.map}
//                 provider={PROVIDER_GOOGLE}
//                 showUserLocation={true}
//                 followUserLocation
//                 loadingEnabled
//                 region={this.getMapRegion()}
//               >
//                 <Polyline
//                   coordinates={this.state.routeCoordinates}
//                   strokeWidth={7}
//                   strokeColor="#b3b3b5"
//                 />
//                 <MarkerAnimated
//                   coordinate={{
//                     latitude: Number(this.state.destinationLatitude),
//                     longitude: Number(this.state.destinationLongitude)
//                   }}
//                   title="Destination"

//                 />
//                 <MarkerAnimated
//                   // ref={marker => {
//                   //   this.marker = marker;
//                   // }}
//                   title="your Location"
//                   coordinate={{
//                     latitude: Number(this.state.latitude),
//                     longitude: Number(this.state.longitude)
//                   }}
//                   zIndex={1}
//                   pinColor={"#24252e"}
//                 />
//                 <Circle
//                   ref={marker => {
//                     this.marker = marker;
//                   }}
//                   center={{
//                     latitude: Number(this.state.latitude),
//                     longitude: Number(this.state.longitude)
//                   }}
//                   radius={4}
//                   strokeWidth={5}
//                   fillColor={"#4d71b8"}
//                   strokeColor={"#ababab"}
//                   lineJoin="miter"
//                   zIndex={1}
//                 />
//                 {
//                   this.state.loading === false
//                     ?
//                     <MapViewDirections
//                       origin={{
//                         latitude: Number(this.state.latitude),
//                         longitude: Number(this.state.longitude)
//                       }}
//                       destination={{
//                         latitude: this.state.destinationLatitude,
//                         longitude: this.state.destinationLongitude
//                       }}
//                       apikey={"AIzaSyDejMEw7iAaAFt7QvmHDhiY1NpZK7R-MRw"}
//                       strokeWidth={13}
//                       strokeColor="#669DF6"
//                       onReady={()=>{

//                       }}
//                     />
//                     : <></>
//                 }

//               </MapView>
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={[styles.bubble, styles.button]}>
//                   <Text style={{
//                     color: "black"
//                   }}>
//                     Travelled {parseFloat(this.state.distanceTravelled).toFixed(2)} km from Start
//                   </Text>
//                 </TouchableOpacity>
//               </View></>
//         }

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     alignItems: "center"
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject
//   },
//   bubble: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.7)",
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20
//   },
//   latlng: {
//     width: 200,
//     alignItems: "stretch"
//   },
//   button: {
//     paddingHorizontal: 12,
//     alignItems: "center",
//     marginHorizontal: 10
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     width: width / 1.5,
//     marginVertical: 20,
//     backgroundColor: "white",
//     shadowColor: "red",
//     shadowOpacity: 1,
//     elevation: 5,
//     borderRadius: 10
//   }
// });
