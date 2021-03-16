import React from 'react';
import useAuth from '../context/AuthContext';
import AppLoading from 'expo-app-loading';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SetupSite from '../screen/SetupSite';
import SetupLeague from "../screen/SetupLeague";

const Stack = createStackNavigator();

export default function AppNavigation() {
    const {authState} = useAuth();

    if (authState.isLoading) {
        return <AppLoading/>;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                // screenOptions={{
                //     headerShown: false,
                // }}
                initialRouteName={'SetupSite'}
            >
                <Stack.Screen
                    name={'SetupSite'}
                    component={SetupSite}
                    options={{title: 'Wybierz województwo'}}
                />
                <Stack.Screen
                    name={'SetupLeague'}
                    component={SetupLeague}
                    options={{title: 'Wybierz Ligę'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}