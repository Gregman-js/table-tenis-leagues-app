import {Dimensions} from 'react-native';

export const COLORS = {
    primary: '#FFD633',
    secondary: '#F9626F',
    gray: '#F9F9F9',
    mediumGray: '#EBEBEB',
    dark: '#292929',
    text: '#191919',
}

export const SIZES = {
    padding: 16,
    padding2: 36,
    h1: 30,
    h2: 25,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 13,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 10,
    body7: 9,
}

export const FONTS = {
    h1: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h1, color: COLORS.text},
    h2: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h2, color: COLORS.text},
    h3: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h3, color: COLORS.text},
    h4: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h4, color: COLORS.text},
    h5: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h5, color: COLORS.text},
    h6: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h6, color: COLORS.text},
    body1: {fontFamily: 'Rubik-Medium', fontSize: SIZES.body1, color: COLORS.text},
    body2: {fontFamily: 'Rubik-Medium', fontSize: SIZES.body2, color: COLORS.text},
    body3: {fontFamily: 'Rubik-Medium', fontSize: SIZES.body3, color: COLORS.text},
    body4: {fontFamily: 'Rubik-Medium', fontSize: SIZES.body4, color: COLORS.text},
    body5: {fontFamily: 'Rubik-Medium', fontSize: SIZES.body5, color: COLORS.text},
    body6: {fontFamily: 'Rubik-Medium', fontSize: SIZES.body6, color: COLORS.text},
    body7: {fontFamily: 'Rubik-Medium', fontSize: SIZES.body7, color: COLORS.text},
    regular3: {fontFamily: 'Rubik-Regular', fontSize: SIZES.body3, color: COLORS.text},
    regular4: {fontFamily: 'Rubik-Regular', fontSize: SIZES.body4, color: COLORS.text},
    regular5: {fontFamily: 'Rubik-Regular', fontSize: SIZES.body5, color: COLORS.text},
    regular6: {fontFamily: 'Rubik-Regular', fontSize: SIZES.body6, color: COLORS.text},
}

export const SHADOWS = {
    regular: {
        shadowColor: "#00000021",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 7,
    }
}

export const WINDOW = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
