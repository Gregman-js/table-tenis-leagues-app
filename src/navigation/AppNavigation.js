import React from "react";
import {Text} from "react-native";
import useAuth from "../context/AuthContext";
import AppLoading from "expo-app-loading";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Setup from "../screen/Setup";

const Stack = createStackNavigator();

export default function AppNavigation () {
    const {authState} = useAuth();
    console.log(authState);

    if (authState.isLoading) {
        return <AppLoading/>;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"Setup"}
                    component={Setup}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}