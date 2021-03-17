import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import {FONTS, SHADOWS} from "../constants/theme";
import { useNavigation } from '@react-navigation/native';

const PeopleIcon = React.memo(() => <FontAwesomeIcon icon={faUser} size={11}/>);

export default function MatchItem ({item}) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {navigation.navigate('EventDetails', {
                event: item,
            })}}
        >
            <View style={styles.header}>
                <Text style={{...FONTS.h6, flex: 1}}>
                    {item.team1} - {item.team2}
                </Text>
            </View>
            <View style={{...styles.header, justifyContent: 'flex-start'}}>
                <PeopleIcon/>
                <Text style={{...FONTS.body5, marginLeft: 3,}}>
                    {item.result}
                </Text>
            </View>
            <View style={styles.header}>
                <Text style={FONTS.regular6}>
                    {item.time}
                </Text>
                <Text style={FONTS.regular6}>
                    {item.date}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 13,
        marginHorizontal: 16,
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