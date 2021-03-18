import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from "../constants/theme";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../context/AuthContext";
import {VOIVODESHIPS} from "../constants/Config";
import TeamsList from "../components/TeamsList";

const cheerio = require("cheerio");

const reg = {
    id: /^[0-9]{1,2}\.$/,
};


export default function Table({navigation}) {

    const {authState} = useAuth();

    const [teams, setTeams] = useState([]);

    React.useEffect(() => {
        const leagueUrl = authState.leagueUrl;

        if (null === leagueUrl) {
            return;
        }

        const ship = VOIVODESHIPS[authState.site];
        (async () => {
            const response = await fetch(ship.site + leagueUrl);
            const htmlString = await response.text();
            const $ = cheerio.load(htmlString);
            const items = $("div#leftnav table tr");

            let tms = [];

            items.each(function (i, e) {
                const rows = $(this).find("td");
                const id = rows.eq(0).text().trim();
                const teamName = rows.eq(1).find("a").text().trim();
                const played = rows.eq(2).text().trim();
                const pkt = rows.eq(3).text().trim();
                const smallPkt = rows.eq(4).text().trim();
                if (false === reg.id.test(id) || "" === teamName) {
                    return;
                }
                tms.push({
                    id: id,
                    name: teamName,
                    played: played,
                    points: pkt,
                    smallPoints: smallPkt,
                });
            });
            setTeams(tms);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigation.openDrawer}
                >
                    <FontAwesomeIcon icon={faBars} size={20}/>
                </TouchableOpacity>
                <Text style={FONTS.h5}>Tabela</Text>
            </View>
            <View style={styles.contentBox}>
                <TeamsList teams={teams}/>
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
    contentBody: {},
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
    contentCalendar: {}
});