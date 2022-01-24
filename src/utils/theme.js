import { DefaultTheme, configureFonts } from 'react-native-paper';
import normalize from 'react-native-normalize';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        white: "#ffffff",
        black: "#000000",
        paragraph: "gray",
        primary: "#37224d"
    },
    fontSize: {
        medium: normalize(18),
        paragraph: normalize(16),
        subheading: normalize(20),
        heading: normalize(24),
        title: normalize(30),
    },
    lineHeight: {
        medium: normalize(25.12),
        paragraph: normalize(21.22),
        subheading: normalize(30.9),
        heading: normalize(34.12),
        title: normalize(41.1),
    },
    fontWeight: {
        normal: "300",
        bold: "bold",
        medium: "500",
        thin: "200",
    },
};