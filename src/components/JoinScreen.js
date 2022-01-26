import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import normalize from 'react-native-normalize';
import navigation from '../navigation';
import { theme } from '../utils/theme';
import TextInput from './TextInput';

function JoinRoom({ createRoom, addUser, navigation }) {

    const [state, setState] = useState({
        name: "Hari",
        room: "",
    });

    const onChangeText = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }

    const joinRoomHandler = () => {
        
        addUser({
            user: state.name+"_2",
        });
        const room = {
            id: state.room,
            members: []
        };
        createRoom(room);
        navigation.navigate("MapScreen", { room: room, currUser:  state.name, isMember: true, isAdmin: false });
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
                label={"Room Id"}
                onChangeText={(value) => {
                    onChangeText("room", value);
                }}
                mode="flat"
                style={styles.textInput}

                value={state.room}
            />
            <TouchableOpacity 
                onPress={joinRoomHandler}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Join Room
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



export default JoinRoom;
