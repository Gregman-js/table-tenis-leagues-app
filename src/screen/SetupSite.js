import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, RadioButton} from "react-native-paper";
import {SIZES} from "../constants/theme";
import useAuth from "../context/AuthContext";

export default function SetupSite({navigation}) {
    const [voivodeship, setVoivodeship] = useState("slask");
    const {authState, selectVoivodeship} = useAuth();

    return (
        <>
            <RadioButton.Group onValueChange={value => setVoivodeship(value)} value={voivodeship}>
                <RadioButton.Item label={"Śląskie"} value={"slask"}/>
            </RadioButton.Group>
            <View style={{
                flex: 1,
            }}>
            </View>
            <Button
                style={{
                    marginBottom: SIZES.padding2,
                    marginHorizontal: SIZES.padding2
                }}
                mode="contained"
                onPress={() => {
                    selectVoivodeship(voivodeship)
                    navigation.navigate('SetupLeague')
                }}
            >
                Zatwierdź
            </Button>
        </>
    )
}