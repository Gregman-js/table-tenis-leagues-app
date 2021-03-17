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
    const {authState} = useAuth();
    const [matches, setMatches] = useState([]);

    React.useEffect(() => {
        const ship = VOIVODESHIPS[authState.site];
        const leagueUrl = authState.leagueUrl;

        (async () => {
            const response = await fetch(ship.site + leagueUrl);
            const htmlString = await response.text();
            const $ = cheerio.load(htmlString);
            const content = $('h2:contains("Terminarz")').parent().find("table tbody").find("tr");

            let items = [];

            content.each(function (i, e) {
                const rows = $(e).find('td.tabela1');
                if (6 !== rows.length) {
                    return;
                }
                const team1 = rows.eq(2).text().trim();
                const team2 = rows.eq(3).text().trim();
                const result = rows.eq(4).text().trim();
                let date = rows.eq(0).text().trim().slice(0,19);
                const time = date.slice(14, 19);
                date = date.slice(0, 10);

                if (authState.teamName !== team1 && authState.teamName !== team2) {
                    return;
                }
                items.push({
                    team1: team1,
                    team2: team2,
                    result: result,
                    date: date,
                    time: time,
                })
            });
            setMatches(items);
        })()
    });


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
                <MatchesList
                    matches={matches}
                />
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