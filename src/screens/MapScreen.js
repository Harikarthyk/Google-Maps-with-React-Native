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
const SOCKET_URL = `https://3e52-2405-201-e017-30b7-e08a-6a4-b2f1-16b4.ngrok.io`;
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
            isConnected: false,
            members: [],
            isAdmin: this.props.route.params.isAdmin ? true : false
        };
    } 
    componentDidMount = async () => {
        this.socket = io(SOCKET_URL);



        this.socket.on("joined", (arg1) => {

            console.log("joined", arg1);
            let members = this.state.members;
            if(arg1.isAdmin === true && this.props.user.user !== arg1.name){
                console.log(arg1, "helo")
                let arr = this.state.members.filter(item => item.name !== arg1.name)
                arr.push(arg1);
          
                this.setState({
                    destinationLatitude: arg1.destinationCords.latitude,
                    destinationLongitude: arg1.destinationCords.longitude,
                    members:[...arr],
                    isAdmin: this.state.isAdmin === false ? (arg1?.isAdmin ? true : false) : true
                
                });
            }else{
                let arr = this.state.members.filter(item => item.name !== arg1.name)
                arr.push(arg1);
          this.setState({
                    members:[...arr],
                    isAdmin: this.state.isAdmin === false ? (arg1?.isAdmin ? true : false) : true
                })
            }
        });
        this.socket.on("sendUpdate", (arg1) => {
            console.log("updates", arg1);
            
        });


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
                const arg1 = {
                    coordinate: { latitude: latitude, longitude: longitude },
                    room: this.props.room.id,
                    name: this.props.user.user,
                    isAdmin: this.props.route.params.isAdmin ? true : false,
                    destinationCords:{
                        latitude: this.props.route.params.isAdmin ? this.state.destinationLatitude : null,
                        longitude:this.props.route.params.isAdmin ? this.state.destinationLongitude : null
                    }
                }
        
                this.socket.emit("join", arg1);
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
            this.socket.emit("update", {
                coordinate: { latitude: this.state.latitude, longitude: this.state.longitude },
                room: this.props.room.id,
                user: this.props.user.user
            });

        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {console.log(this.state.members, "meme")}
                {
                    this.state.isAdmin === true ?
                
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
                            latitude: Number(this.state?.destinationLongitude || 11.003795),
                            longitude: Number(this.state?.destinationLatitude || 77.014790)
                        }}
                        title="Destination"

                    />
                    {this.state?.members?.map((item,index) => {
                        return(
                            <MarkerAnimated
                                // ref={marker => {
                                //   this.marker = marker;
                                // }}
                                title={`${item.name} is here.`}
                                coordinate={{
                                    // latitude: 11.003795,
                                    // longitude: 77.014790
                                    latitude: Number(item.coordinate?.latitude ||  11.003795),
                                    longitude: Number(item.coordinate?.longitude || 77.014790)
                                }}
                                key={item.user + index + ""}
                                zIndex={1}
                                pinColor={'#' + Math.random().toString(16).substr(-6)}
                            >
                            </MarkerAnimated>
                        )
                    })}
                    {/* <MarkerAnimated
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
                    /> */}
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
                        this.state.loading === false ? this.state?.destinationLatitude &&this.state?.destinationLongitude &&
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
                :<></>
    }
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
                        {this.state?.members?.length + 1}
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