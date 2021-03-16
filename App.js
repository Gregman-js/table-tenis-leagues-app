import React from "react";
import {Text} from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
    return (
        <AuthProvider>
            <AppNavigation/>
        </AuthProvider>
    );
}
