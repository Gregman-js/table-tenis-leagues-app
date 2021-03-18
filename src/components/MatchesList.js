import React, {useState} from 'react';
import MatchItem from "./MatchItem";
import {FlatList, StyleSheet} from "react-native";
import {SIZES} from "../constants/theme";
import {VOIVODESHIPS} from "../constants/Config";
import useAuth from "../context/AuthContext";
import cheerio from "cheerio";

const monthName = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];

const getFullDateName = day => {
    if (null === day) {
        return '';
    }
    let date = new Date(day);

    return `${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()}`;
}

const keyExtractor = (item, index) => index.toString();
const renderItem = ({item}) => <MatchItem item={item}/>;
const today = (new Date()).setHours(0, 0, 0, 0);

function MatchesList() {
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
                let date = rows.eq(0).text().trim().slice(0, 19);
                const time = date.slice(14, 19);
                date = date.slice(0, 10);

                if (authState.teamName !== team1 && authState.teamName !== team2) {
                    return;
                }
                const startDate = (new Date(date)).setHours(0, 0, 0, 0);


                items.push({
                    team1: team1,
                    team2: team2,
                    result: result,
                    date: date,
                    time: time,
                    status: startDate > today
                        ? 0
                        : startDate < today
                            ? 1
                            : -1
                })
            });

            items.sort((a, b) => {
                if (a.status > b.status) {
                    return 1;
                } else if (a.status < b.status) {
                    return -1;
                } else return 0;
            });

            setMatches(items);
        })()
    }, []);

    return (
        <FlatList
            data={matches}
            contentContainerStyle={{flexGrow: 1, paddingTop: SIZES.padding, paddingBottom: SIZES.padding}}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    );
}

export default React.memo(MatchesList);

const styles = StyleSheet.create({
    contentEmptyList: {
        flex: 1,
        alignItems: 'center',
    },
});