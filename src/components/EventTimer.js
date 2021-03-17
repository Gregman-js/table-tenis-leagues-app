import React, {useState, useMemo} from 'react';
import {StatusBar, StyleSheet, Text, View} from "react-native";
import {COLORS, FONTS, SHADOWS, SIZES, WINDOW} from "../constants";
import Svg, {Circle} from "react-native-svg";

const today = new Date();

let interval = null;

export default function EventTimer ({countTo, createdAt}) {

    const [count, setCount] = useState((new Date(countTo)).getTime() - today.getTime());
    const maxCount = useMemo(() => (new Date(countTo)).getTime() - (new Date(createdAt)).getTime(), [countTo, createdAt]);

    React.useEffect(() => {
        interval = setInterval(() => {
            setCount(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    let timerNumbers = [0,0,0,0];
    let progress = 17;

    if (count > 0) {
        timerNumbers[3] = Math.floor(count / 1000 / 60 / 60 / 24);
        timerNumbers[2] = Math.floor((count - (timerNumbers[3] * 24 * 60 * 60 * 1000)) / 1000 / 60 / 60);
        timerNumbers[1] = Math.floor((count - (timerNumbers[3] * 24 * 60 * 60 * 1000) - (timerNumbers[2] * 60 * 60 * 1000)) / 1000 / 60);
        timerNumbers[0] = Math.floor((count - (timerNumbers[3] * 24 * 60 * 60 * 1000) - (timerNumbers[2] * 60 * 60 * 1000) - (timerNumbers[1] * 60 * 1000)) / 1000);

        progress = (1-count/maxCount)*17;
    }

    for (let i in timerNumbers) {
        if (timerNumbers[i] < 10) {
            timerNumbers[i] = '0' + timerNumbers[i];
        }
    }

    return (
        <View
            style={styles.timer}
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignSelf: 'stretch',
                paddingHorizontal: 5,
            }}>
                <Svg width={38} height={38}>
                    <Circle
                        stroke={COLORS.mediumGray}
                        fill={"none"}
                        r={16}
                        cx={19}
                        cy={19}
                        strokeWidth={4}
                    />
                    <Circle
                        stroke={COLORS.secondary}
                        fill={"none"}
                        r={16}
                        cx={19}
                        cy={19}
                        strokeDasharray={`${progress * 2 * Math.PI} ${17 * 2 * Math.PI}`}
                        strokeWidth={4}
                        // strokeLinecap={"round"}
                    />
                </Svg>
                <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={styles.timerBoxValue}>{timerNumbers[3]}</Text>
                        <Text style={styles.timerBoxSeparator}>:</Text>
                        <Text style={styles.timerBoxValue}>{timerNumbers[2]}</Text>
                        <Text style={styles.timerBoxSeparator}>:</Text>
                        <Text style={styles.timerBoxValue}>{timerNumbers[1]}</Text>
                        <Text style={styles.timerBoxSeparator}>:</Text>
                        <Text style={styles.timerBoxValue}>{timerNumbers[0]}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={styles.timerBoxTitle}>dni</Text>
                        <Text style={{...styles.timerBoxTitle, marginLeft: 6}}>godz.</Text>
                        <Text style={{...styles.timerBoxTitle, marginLeft: 6}}>min.</Text>
                        <Text style={{...styles.timerBoxTitle, marginLeft: 6}}>sek.</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const timerBoxWidth = 40;

const styles = StyleSheet.create({
    timer: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        transform: [
            { translateY: -24 },
        ],
        ...SHADOWS.regular
    },
    timerBoxWrapper: {
        marginHorizontal: 10,
    },
    timerBoxTitle: {
        textAlign: 'center',
        marginTop: 2,
        ...FONTS.body6,
        width: timerBoxWidth,
    },
    timerBoxValue: {
        textAlign: 'center',
        ...FONTS.body2,
        width: timerBoxWidth,
    },
    timerBoxSeparator: {
        textAlign: 'center',
        ...FONTS.body2,
        width: 6,
    },
});