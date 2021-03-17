import React, {useCallback} from 'react';
import MatchItem from "./MatchItem";
import {FlatList, StyleSheet, Text, View, ScrollView} from "react-native";
import {FONTS} from "../constants/theme";

const monthName = ['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień'];

const getFullDateName = day => {
    if (null === day) {
        return '';
    }
    let date = new Date(day);

    return `${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()}`;
}

const keyExtractor = (item, index) => index.toString();
const renderItem = ({item}) => <MatchItem item={item}/>;

function MatchesList ({matches}) {

    return (
        <FlatList
            data={matches}
            contentContainerStyle={{flexGrow: 1, paddingTop: 10, paddingBottom: 30}}
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