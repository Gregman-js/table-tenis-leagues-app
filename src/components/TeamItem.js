import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FONTS, SHADOWS, SIZES} from "../constants/theme";

export default function TeamItem({item}) {

    return (
        <View
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={{...FONTS.h6, flex: 1}}>
                    {item.id} {item.name}
                </Text>
            </View>
            <View style={{...styles.header, justifyContent: 'flex-start'}}>
                <FontAwesomeIcon icon={faStar} size={15} color={"#666"}/>
                <Text style={{...FONTS.body4, marginLeft: 3}}>
                    {item.points}
                </Text>
            </View>
            <View style={styles.header}>
                <Text style={FONTS.regular6}>
                    {item.smallPoints}
                </Text>
                <Text style={FONTS.regular6}>
                    {item.played}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 13,
        marginHorizontal: SIZES.padding,
        marginVertical: 10,
        ...SHADOWS.regular
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 2,
        flex: 1,
    },
});