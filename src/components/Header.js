import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import normalize from 'react-native-normalize'
import { ICONS } from '../constants'
import { theme } from '../utils/theme'

function Header({ title, navigation }) {
    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={ICONS.BACK}
                    style={styles.backImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: normalize(55),
        flexDirection: "row",
        alignItems: "center"
    },  
    backButton:{
        // backgroundColor: "white",
        padding: normalize(15)
    },  
    backImage: {
        height: normalize(22),
        width: normalize(22)
    },
    headerText: {
        color: theme.colors.white,
        fontSize: theme.fontSize.subheading
    }
})

export default Header;
