import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, RadioButton} from "react-native-paper";
import {SIZES} from "../constants/theme";
import useAuth from "../context/AuthContext";
import {VOIVODESHIPS} from "../constants/Config";

const cheerio = require("cheerio");

export default function SetupTeam({navigation}) {
    const {authState, selectTeam} = useAuth();

    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => {
                        const team = teams.filter(el => el.url === selectedTeam)[0];
                        selectTeam(team.url, team.name)
                    }}
                    mode={"contained"}
                    style={{marginRight: SIZES.padding}}
                >Dalej</Button>
            ),
        });
    }, [navigation, selectedTeam, teams]);

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
            const items = $("div#leftnav table tr a");

            let tms = [];

            items.each(function (i, e) {
                let url = $(this).attr("href");
                let name = $(this).text();
                if (url.includes("/druzyna/") && name) {
                    tms.push({
                        name: name,
                        url: url
                    });
                }
            });
            setTeams(tms);
        })();
    }, [authState.leagueUrl]);

    return (
        <ScrollView>
            <RadioButton.Group onValueChange={value => setSelectedTeam(value)} value={selectedTeam}>
                {teams.map((value, index) => {
                    return <RadioButton.Item label={value.name} value={value.url} key={index}/>
                })}
            </RadioButton.Group>
        </ScrollView>
    )
}