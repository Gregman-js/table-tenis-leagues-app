import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import {FONTS, SHADOWS, SIZES} from "../constants/theme";

const PeopleIcon = React.memo(() => <FontAwesomeIcon icon={faUser} size={11}/>);


export function processColor({status}) {
    return 0 === status
        ? "#EFC27E"
        : -1 === status
            ? "#ABEF7E"
            : "#EF7E7E"
}

export default function MatchItem({item}) {

    return (
        <View
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={{...FONTS.h6, flex: 1}}>
                    {item.team1} - {item.team2}
                </Text>
            </View>
            <View style={{...styles.header, justifyContent: 'flex-start'}}>
                <FontAwesomeIcon icon={faCircle} size={16} color={processColor(item)}/>
                <Text style={{...FONTS.body5, marginLeft: 3,}}>
                    {item.result}
                </Text>
            </View>
            <View style={styles.header}>
                <Text style={FONTS.regular6}>
                    {item.date} {item.time}
                </Text>
                <Text style={FONTS.regular6}>
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