import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, RadioButton} from "react-native-paper";
import {SIZES} from "../constants/theme";
import useAuth from "../context/AuthContext";
import {VOIVODESHIPS} from "../constants/Config";
const cheerio = require("cheerio");

export default function SetupLeague({navigation}) {
    const {authState, selectLeague} = useAuth();
    const [leagues, setLeagues] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState(null);

    React.useEffect(() => {
        if (null === authState.site) {
            return;
        }

        const ship = VOIVODESHIPS[authState.site];
        (async () => {
            const response = await fetch(ship.site);      // fetch page
            const htmlString = await response.text();     // get response text
            const $ = cheerio.load(htmlString);           // parse HTML string
            const items = $("div#nav-top li a");

            let ligi = [];

            items.each(function (i, e) {
                let url = $(this).attr("href");
                if (url.includes("/liga/")) {
                    ligi.push({
                        name: $(this).text(),
                        url: url
                    });
                }
            });
            setLeagues(ligi);
        })();
    }, [authState.site]);


    return (
        <ScrollView>
            <RadioButton.Group onValueChange={value => setSelectedUrl(value)} value={selectedUrl}>
                {leagues.map((value, index) => {
                    return <RadioButton.Item label={value.name} value={value.url} key={index}/>
                })}
            </RadioButton.Group>
            <View style={{
                flex: 1,
            }}>
            </View>
            {leagues.length > 0 && (
                <Button
                    style={{
                        marginBottom: SIZES.padding2,
                        marginHorizontal: SIZES.padding2,
                        marginTop: SIZES.padding2,
                    }}
                    mode="contained"
                    onPress={() => {
                        selectLeague(selectedUrl)
                        navigation.navigate('SetupTeam')
                    }}
                >
                    Zatwierdź
                </Button>
            )}
        </ScrollView>
    )
}