import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import normalize from 'react-native-normalize';
import navigation from '../navigation';
import { theme } from '../utils/theme';
import TextInput from './TextInput';

function CreateRoom({ createRoom, addUser, navigation }) {

    const [state, setState] = useState({
        name: "Hari",
        latitude: "11.0082371",
        longitude: "77.021472",
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

        navigation.navigate("MapScreen", { room: roomId, currUser: user, longitude: state.longitude, latitude: state.latitude });


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
                style={styles.button}
            >
                <Text style={styles.buttonText}>
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
        backgroundColor: "#dbdbdb",
        padding: normalize(5),
        marginVertical: normalize(15),
        width: "92%",
        alignSelf: "center"
    },
    button: {
        padding: normalize(15),
        width: "92%",
        alignSelf: "center",
        borderRadius: normalize(5),
        backgroundColor: theme.colors.primary,
        elevation: 11,
        shadowColor: theme.colors.white,
        shadowOpacity: 10
    },
    buttonText: {
        color: theme.colors.white,
        fontWeight: theme.fontWeight.medium,
        fontSize: theme.fontSize.subheading,
        textAlign: "center"
    }
})



export default CreateRoom;
