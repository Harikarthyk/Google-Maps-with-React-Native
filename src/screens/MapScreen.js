import React, { Component, useEffect } from "react";
import {
    Platform,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput
} from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    PROVIDER_GOOGLE,
    Polyline,
    Circle,
    MarkerAnimated
} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import haversine from "haversine";
import MapViewDirections from 'react-native-maps-directions';
import io from "socket.io-client";
import normalize from "react-native-normalize";
import { VALUES } from "../constants";
import { connect } from "react-redux";
import { theme } from "../utils/theme";


// Constants
const SOCKET_URL = `https://b470-2405-201-e017-3bbb-706b-ba75-50e3-a982.ngrok.io`;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 11.003557;
const LONGITUDE = 77.014863;
const LATITUDE_DELTA = 0.0021;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class MapScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            destinationLatitude: Number(this.props.route.params.latitude),
            destinationLongitude: Number(this.props.route.params.longitude),
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            startLatitude: LATITUDE,
            startLongitude: LONGITUDE,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE
            }),
            loading: true,
            isConnected: false
        };
    } 
    componentDidMount = async () => {
        // this.socket = io(SOCKET_URL);

        // const arg1 = {
        //     room: userId,
        //     name: "Hari"
        // }

        // this.socket.emit("join", arg1);

        // this.socket.on("joined", (arg1) => {
        //     console.log("joined", arg1);
        //     this.setState({
        //         console: arg1
        //     })
        // });
        // this.socket.on("sendUpdate", (arg1) => {
        //     console.log("updates", arg1);
        //     this.setState({
        //         console: this.state.console + " " + arg1?.coordinate?.latitude + " "
        //     })
        // });

        this.watchLocation();
    }

    getMapRegion = () => ({
        latitude: Number(this.state.latitude),
        longitude: Number(this.state.longitude),
        latitudeDelta: Number(LATITUDE_DELTA),
        longitudeDelta: Number(LONGITUDE_DELTA)
    });

    watchLocation = () => {
        const { coordinate } = this.state;
        this.watchID = Geolocation.watchPosition(
            position => {
                const { routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;

                const newCoordinate = {
                    latitude: Number(latitude),
                    longitude: Number(longitude)
                };

                if (Platform.OS === "android") {
                    if (this.marker) {
                        this.marker?._component?.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    latitude,
                    longitude,
                    loading: false,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled:
                        distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate,
                    startLatitude: latitude,
                    startLongitude: longitude
                });
            },
            error => {
                console.log(error);
                alert('Error in getting your location')
            },
            {
                enableHighAccuracy: false,
                timeout: 2000,
                maximumAge: 3600000,
                distanceFilter: 10
            }
        );
    };

    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    componentDidUpdate = (prevProps, prevState) => {
        // console.log(prevProps,"   " ,prevState)
        if (this.state.latitude !== prevState.latitude) {
            // this.socket.emit("update", {
            //     coordinate: { latitude: this.state.latitude, longitude: this.state.longitude },
            //     room: "123456789",
            //     user: "Hari"
            // });

            // this.pubnub.publish({
            //   message: {
            //     latitude: this.state.latitude,
            //     longitude: this.state.longitude,
            //   },
            //   channel: 'location',
            // });
            // this.socket.emit
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showUserLocation={true}
                    followUserLocation
                    loadingEnabled
                    region={this.getMapRegion()}
                >
                    <Polyline
                        coordinates={this.state.routeCoordinates}
                        strokeWidth={7}
                        strokeColor="#b3b3b5"
                    />
                    <MarkerAnimated
                        coordinate={{
                            latitude: Number(this.props.route.params.latitude),
                            longitude: Number(this.props.route.params.longitude)
                        }}
                        title="Destination"

                    />
                    <MarkerAnimated
                        // ref={marker => {
                        //   this.marker = marker;
                        // }}
                        title={`Your Location ${this.props.user.user}`}
                        coordinate={{
                            latitude: Number(this.state.latitude),
                            longitude: Number(this.state.longitude)
                        }}
                        zIndex={1}
                        pinColor={"#24252e"}
                    />
                    <Circle
                        ref={marker => {
                            this.marker = marker;
                        }}
                        center={{
                            latitude: Number(this.state.latitude),
                            longitude: Number(this.state.longitude)
                        }}
                        radius={ASPECT_RATIO + 5}
                        strokeWidth={5}
                        fillColor={"#4d71b8"}
                        strokeColor={"#ababab"}
                        lineJoin="miter"
                        zIndex={1}
                    />

                    {
                        this.state.loading === false ?
                            <MapViewDirections
                                origin={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude
                                }}
                                destination={{
                                    latitude: this.state.destinationLatitude,
                                    longitude: this.state.destinationLongitude,
                                }}
                                apikey={"AIzaSyDejMEw7iAaAFt7QvmHDhiY1NpZK7R-MRw"}
                                strokeWidth={13}
                                strokeColor="#669DF6"
                                onReady={() => {

                                }}
                                
                            />
                        :
                        <></>
                    }
                </MapView>
                {console.log(this.props.room)}
                <View 
                    style={{
                        width: normalize(100),
                        height: normalize(70),
                        padding: normalize(10),
                        zIndex: 1,
                        position: 'absolute',
                        bottom: normalize(25),
                        right: normalize(10),
                        backgroundColor: theme.colors.white,
                        opacity: 0.7,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text 
                        style={{
                            color: theme.colors.primary,
                            fontSize: theme.fontSize.title,
                            fontWeight: theme.fontWeight.medium
                        }}
                    >
                        {this.props.room?.members?.length + 1}
                    </Text>
                    <Text 
                        style={{
                            color: theme.colors.primary,
                            fontSize: theme.fontSize.paragraph,
                            fontWeight: theme.fontWeight.thin
                        }}
                    >
                        IN ROOM
                    </Text>
                </View>
                <View 
                    style={{
                        width: normalize(200),
                        height: normalize(70),
                        padding: normalize(10),
                        zIndex: 1,
                        position: 'absolute',
                        bottom: normalize(25),
                        left: normalize(10),
                        backgroundColor: theme.colors.white,
                        opacity: 0.7,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text 
                        style={{
                            color: theme.colors.primary,
                            fontSize: theme.fontSize.title,
                            fontWeight: theme.fontWeight.medium
                        }}
                    >
                        {this.props.room?.id}
                    </Text>
                    <Text 
                        style={{
                            color: theme.colors.primary,
                            fontSize: theme.fontSize.paragraph,
                            fontWeight: theme.fontWeight.thin
                        }}
                    >
                        ROOM CODE
                    </Text>
                </View>
               
                {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.bubble, styles.button]}>
                        <Text style={{
                            color: "black"
                        }}>
                            Travelled {parseFloat(this.state.distanceTravelled).toFixed(2)} km from Start
                        </Text>
                    </TouchableOpacity>
                </View> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        width: width / 1.5,
        marginVertical: 20,
        backgroundColor: "white",
        shadowColor: "red",
        shadowOpacity: 1,
        elevation: 5,
        borderRadius: 10
    }
});


const mapStateToProps = state => {
    return {
        user: state.userReducer,
        room: state.roomReducer
    }
}

// const mapDispatchToProps = dispatch => ({
//     setRoom: cart => dispatch(setCart(cart))
// });

export default connect(mapStateToProps, null)(MapScreen);