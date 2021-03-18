import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, RadioButton} from "react-native-paper";
import {SIZES} from "../constants/theme";
import useAuth from "../context/AuthContext";

export default function SetupSite({navigation}) {
    const [voivodeship, setVoivodeship] = useState("slask");
    const {authState, selectVoivodeship} = useAuth();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => {
                        selectVoivodeship(voivodeship)
                        navigation.navigate('SetupLeague')
                    }}
                    mode={"contained"}
                    style={{marginRight: SIZES.padding}}
                >Dalej</Button>
            ),
        });
    }, [navigation, voivodeship]);


    return (
        <>
            <RadioButton.Group onValueChange={value => setVoivodeship(value)} value={voivodeship}>
                <RadioButton.Item label={"Śląskie"} value={"slask"}/>
            </RadioButton.Group>
        </>
    )
}