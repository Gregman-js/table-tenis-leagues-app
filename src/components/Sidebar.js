import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBars, faQuestionCircle, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import DrawerSection from "react-native-paper/src/components/Drawer/DrawerSection";
import {COLORS, FONTS, SHADOWS, SIZES} from "../constants/theme";
import useAuth from "../context/AuthContext";

export default function SidebarContent({navigation, ...props}) {
    const {signOut} = useAuth();

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} style={styles.itemsContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={navigation.closeDrawer}
                    >
                        <FontAwesomeIcon icon={faBars} size={22} color={props.activeTintColor}/>
                    </TouchableOpacity>
                </View>
                <DrawerItemList {...props} navigation={navigation}/>
            </DrawerContentScrollView>
            <DrawerSection style={styles.bottom}>
                <View style={styles.bottomBorder}/>
                <DrawerItem
                    label={"Wyloguj"}
                    icon={({color, size}) => (
                        <FontAwesomeIcon icon={faSignOutAlt} size={size} color={color}/>
                    )}
                    onPress={() => {
                        signOut();
                    }}
                    {...props}
                    style={{marginHorizontal: 0}}
                />
            </DrawerSection>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.dark,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
    },
    itemsContainer: {
        paddingHorizontal: SIZES.padding2,
    },
    bottom: {
        marginBottom: 15,
        paddingHorizontal: SIZES.padding2,
    },
    bottomBorder: {
        backgroundColor: COLORS.secondary,
        height: 1,
    },
    header: {
        flex: 1,
        paddingVertical: 15,
    },
    viewItem: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        marginVertical: 20,

    },
    itemButton: {
        backgroundColor: COLORS.primary,
        height: 40,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.regular,
        marginBottom: 30,
    },
    itemButtonText: {
        color: "#000",
        textTransform: 'uppercase',
    },
});