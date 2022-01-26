import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize';
import { IMAGES } from '../constants';
import { theme } from '../utils/theme';

function HomeScreen({ navigation }) {
    return (
        <SafeAreaView 
            style={styles.container}
        >
            <Image
                source={IMAGES.LOGO}
                style={styles.logo}
                resizeMode="contain"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    navigation.navigate("RoomScreen",{
                        title: "Create Room",
                        navigation: navigation,
                        id: "create"
                    })
                }}
            >

                <Text style={styles.text}>
                    CREATE NEW ROOM
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    navigation.navigate("RoomScreen", {
                        title: "Join Room",
                        navigation: navigation,
                        id: "join"
                    });
                }}
            >

                <Text style={styles.text}>
                    JOIN ROOM
                </Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.black
    },
    logo: {
        height: normalize(130),
        width: normalize(130),
        marginBottom: normalize(20)
    },
    button: {
        backgroundColor: "#307351",
        width: "80%",
        borderRadius: normalize(10),
        padding: normalize(10),
        marginVertical: normalize(15)
    },
    text: {
        textAlign: "center",
        fontSize: theme.fontSize.medium,
        fontWeight: theme.fontWeight.medium
    }
})

export default HomeScreen;
