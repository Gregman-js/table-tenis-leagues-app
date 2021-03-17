import React, {useState} from 'react';
import {Text, View, ScrollView, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {Button, RadioButton} from "react-native-paper";
import {COLORS, FONTS, SIZES} from "../constants/theme";
import useAuth from "../context/AuthContext";
import {VOIVODESHIPS} from "../constants/Config";
const cheerio = require("cheerio");
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {LinearGradient} from "react-native-svg";
import MatchesList from "../components/MatchesList";


export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigation.openDrawer}
                >
                    <FontAwesomeIcon icon={faBars} size={20}/>
                </TouchableOpacity>
                <Text style={FONTS.h5}>Mecze</Text>
            </View>
            <View style={styles.contentBox}>
                <MatchesList />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.secondary,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        display: 'flex',
        paddingTop: StatusBar.currentHeight
    },
    header: {
        paddingVertical: 15,
        paddingHorizontal: SIZES.padding2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: COLORS.secondary,
    },
    contentBox: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: COLORS.gray,
        position: 'relative',
        overflow: 'hidden',
    },
    contentHeader: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.padding2,
    },
    contentHeaderTexts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 2,
        alignItems: 'flex-end'
    },
    contentHeaderIcon: {
        flex: 1,
        alignItems: 'flex-end'
    },
    contentBody: {

    },
    linearTop: {
        position: 'absolute',
        top: 25,
        left: 0,
        width: '100%',
        height: 25,
        zIndex: 1,
    },
    linearGray: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 100,
    },
    contentHeaderTextsItem: {
        position: 'relative',
    },
    contentHeaderTextsItemBar: {
        position: 'absolute',
        bottom: -5,
        width: 30,
        height: 3,
        borderRadius: 2,
        backgroundColor: COLORS.secondary,
    },
    contentCalendar: {
    }
});