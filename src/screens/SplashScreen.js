import React, { useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, Image } from 'react-native'
import normalize from 'react-native-normalize';
import { IMAGES } from '../constants';
// import {  } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { theme } from '../utils/theme';

function SplashScreen({ navigation }) {
    
    useEffect(()=>{

        setTimeout(()=>{
            // navigation.replace("HomeScreen");
        }, 2000);
        

        return function cleanUp(){

        };
        
    },[]);

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Image
                source={IMAGES.LOGO}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>
                Connect
            </Text>
            <Text style={styles.slogan}>
                Stay Connected
            </Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.black,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: normalize(180),
        height: normalize(180)
    },
    title: {
        fontSize: theme.fontSize.title,
        color: theme.colors.white,
        lineHeight: theme.lineHeight.title
    },
    slogan: {
        color: theme.colors.white,
        fontSize: theme.fontSize.medium,
        lineHeight: theme.lineHeight.heading
    }
})

export default SplashScreen;
