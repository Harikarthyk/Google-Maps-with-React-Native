import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import normalize from 'react-native-normalize';
import navigation from '../navigation';
import TextInput from './TextInput';

function CreateRoom({ createRoom, addUser, navigation }) {

    const [state, setState] = useState({
        name: "",
        longitude: "",
        latitude: "",
        search: ""
    });

    const onChangeText = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }

    const createRoomHandler = () => {

        const roomId = Math.random().toString().substr(2, 6);

        const room = {
            id: roomId,
            members: []
        };
        const user = state.name + "_1";


        addUser({
            user: user,
        });

        createRoom(room);

        navigation.navigate("MapScreen");


    }


    return (
        <View style={styles.container}>
            <TextInput
                keyboardType={"default"}
                label={"Your Name"}
                onChangeText={(value) => {
                    onChangeText("name", value);
                }}
                mode="flat"
                style={styles.textInput}

                value={state.name}
            />
            <TextInput
                keyboardType={"numeric"}
                label={"Latitude"}
                onChangeText={(value) => {
                    onChangeText("latitude", value);
                }}
                mode="flat"
                style={styles.textInput}

                value={state.latitude}
            />
            <TextInput
                keyboardType={"numeric"}
                label={"Longitude"}
                onChangeText={(value) => {
                    onChangeText("longitude", value);
                }}
                mode="flat"
                style={styles.textInput}

                value={state.longitude}
            />
            <TouchableOpacity 
                onPress={createRoomHandler}
            >
                <Text>
                    Create Room
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        backgroundColor: "white",
        padding: normalize(5),
        marginVertical: normalize(15),
        width: "80%",
        alignSelf: "center"
    }
})


export default CreateRoom;
