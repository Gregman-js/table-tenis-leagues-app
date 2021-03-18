import React from 'react';
import {FlatList, StyleSheet} from "react-native";
import {SIZES} from "../constants/theme";
import TeamItem from "./TeamItem";

const monthName = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];

const getFullDateName = day => {
    if (null === day) {
        return '';
    }
    let date = new Date(day);

    return `${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()}`;
}

const keyExtractor = (item, index) => index.toString();
const renderItem = ({item}) => <TeamItem item={item}/>;

function TeamsList({teams}) {

    return (
        <FlatList
            data={teams}
            contentContainerStyle={{flexGrow: 1, paddingTop: SIZES.padding, paddingBottom: SIZES.padding}}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    );
}

export default React.memo(TeamsList);

const styles = StyleSheet.create({
    contentEmptyList: {
        flex: 1,
        alignItems: 'center',
    },
});