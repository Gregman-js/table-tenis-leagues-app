import React from 'react';
import useAuth from '../context/AuthContext';
import AppLoading from 'expo-app-loading';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTable, faTableTennis} from "@fortawesome/free-solid-svg-icons";
import SetupSite from '../screen/SetupSite';
import SetupLeague from "../screen/SetupLeague";
import SetupTeam from "../screen/SetupTeam";
import {createDrawerNavigator} from "@react-navigation/drawer";
import SidebarContent from "../components/Sidebar";
import {Dimensions} from "react-native";
import {COLORS, FONTS, SIZES} from "../constants/theme";
import {useFonts} from "expo-font";
import Home from "../screen/Home";
import Table from "../screen/Table";
import {Button} from "react-native-paper";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
    const {authState} = useAuth();

    let [fontsLoaded] = useFonts({
        'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
        'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
        'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
    });

    if (authState.isLoading || false === fontsLoaded) {
        return <AppLoading/>;
    }

    return (
        <NavigationContainer>
            {null === authState.site || null === authState.leagueUrl || null === authState.teamUrl || null === authState.teamName ?
                (
                    <Stack.Navigator
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
                        <Stack.Screen
                            name={'SetupTeam'}
                            component={SetupTeam}
                            options={{title: 'Wybierz Drużynę'}}
                        />
                    </Stack.Navigator>
                )
                :
                (
                    <Drawer.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName="Events"
                        drawerContent={props => <SidebarContent {...props} />}
                        drawerStyle={{
                            backgroundColor: 'transparent',
                        }}
                        drawerContentOptions={{
                            inactiveTintColor: '#ddd',
                            activeTintColor: '#fff',
                            pressColor: COLORS.secondary,
                            labelStyle: {
                                paddingLeft: SIZES.padding,
                                ...FONTS.regular3,
                                color: '#fff'
                            },
                            itemStyle: {marginHorizontal: 0},
                        }}
                        edgeWidth={Dimensions.get('window').width}
                        swipeEnabled={true}
                    >
                        <Drawer.Screen
                            name="Matches"
                            component={Home}
                            options={{
                                drawerLabel: 'Mecze',
                                drawerIcon: ({color, size}) => (
                                    <FontAwesomeIcon icon={faTableTennis} size={size} color={color}/>
                                ),
                            }}
                        />
                        <Drawer.Screen
                            name="Table"
                            component={Table}
                            options={{
                                drawerLabel: 'Tabela',
                                drawerIcon: ({color, size}) => (
                                    <FontAwesomeIcon icon={faTable} size={size} color={color}/>
                                ),
                            }}
                        />
                    </Drawer.Navigator>
                )}
        </NavigationContainer>
    );
}