import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, RadioButton} from "react-native-paper";
import {SIZES} from "../constants/theme";
import useAuth from "../context/AuthContext";
import {VOIVODESHIPS} from "../constants/Config";
const cheerio = require("cheerio");

export default function Home({navigation}) {
    const {authState, signOut} = useAuth();
    return (
        <>
            <Text>Hallo</Text>
            <Button icon="camera" mode="contained" onPress={() => signOut()}>
                Wyloguj
            </Button>
        </>
    )
}