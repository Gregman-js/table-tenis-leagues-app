import React from "react";
import {StyleSheet} from "react-native";
import {COLORS} from "../constants";

export const inlineInputStyles = StyleSheet.create({
    containerTouchable: {
        width: '100%',
    },
    container: {
        flexDirection: "row",
        backgroundColor: "#F3F3F3",
        borderRadius: 30,
        height: 60,
        paddingLeft: 30,
        alignSelf: 'stretch',
    },
    input: {
        flexGrow: 1,
        flex: 1,
        paddingRight: 10,
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.secondary,
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});