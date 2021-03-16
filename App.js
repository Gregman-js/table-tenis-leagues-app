import React from "react";
import {Text} from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AppNavigation from "./src/navigation/AppNavigation";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // primary: 'tomato',
        // accent: 'yellow',
    },
};

export default function App() {
    return (
        <AuthProvider>
            <PaperProvider theme={theme}>
                <AppNavigation/>
            </PaperProvider>
        </AuthProvider>
    );
}
