import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    SplashScreen,
    HomeScreen,
    SettingScreen,
    MapScreen,
    RoomScreen
} from '../screens';

const MainNavigator = createStackNavigator();

export default MainStackNavigation = () => {
    return(
        <MainNavigator.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <MainNavigator.Screen
                name="SplashScreen"
                component={SplashScreen}
            /> 
            <MainNavigator.Screen
                name="RoomScreen"
                component={RoomScreen}
            />
        
            <MainNavigator.Screen
                name="SettingScreen"
                component={SettingScreen}
            />
            <MainNavigator.Screen
                name="MapScreen"
                component={MapScreen}
            />
            <MainNavigator.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
            

        </MainNavigator.Navigator>
    );
}
