import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/Home";

const Stack = createStackNavigator();

export default function MatchesNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={"Home"}
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}
