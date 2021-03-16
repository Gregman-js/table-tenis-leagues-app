import React, {useContext} from 'react';
import {AsyncStorage} from "react-native";

const AuthContext = React.createContext();

export default function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        leagueUrl: action.leagueUrl,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        leagueUrl: action.leagueUrl,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        leagueUrl: null,
                    };
            }
        },
        {
            isLoading: true,
            leagueUrl: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let leagueUrl;

            try {
                leagueUrl = await AsyncStorage.getItem('leagueUrl');
            } catch (e) {

            }

            dispatch({type: 'RESTORE_TOKEN', leagueUrl: leagueUrl});
        };

        bootstrapAsync();
    }, []);

    const authFlow = React.useMemo(
        () => ({
            selectLeague: async url => {
                await AsyncStorage.setItem('leagueUrl', url);
                dispatch({type: 'SIGN_IN', leagueUrl: url});
            },
            signOut: async () => {
                await AsyncStorage.removeItem('leagueUrl');
                dispatch({type: 'SIGN_OUT'});
            },
        }),
        []
    );

    const authValues = {
        ...authFlow,
        authState: state
    }

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    )
}