import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {VOIVODESHIPS} from '../constants/Config';

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
                        site: action.site,
                        leagueUrl: action.leagueUrl,
                        teamUrl: action.teamUrl,
                        teamName: action.teamName,
                        isLoading: false,
                    };
                case 'SELECT_SITE':
                    return {
                        ...prevState,
                        site: action.site,
                    };
                case 'SELECT_LEAGUE':
                    return {
                        ...prevState,
                        leagueUrl: action.leagueUrl,
                    };
                case 'SELECT_TEAM':
                    return {
                        ...prevState,
                        teamUrl: action.teamUrl,
                        teamName: action.teamName,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        site: null,
                        leagueUrl: null,
                        teamUrl: null,
                        teamName: null,
                    };
            }
        },
        {
            isLoading: true,
            site: null,
            leagueUrl: null,
            teamUrl: null,
            teamName: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let leagueUrl;
            let site;
            let teamUrl;
            let teamName;

            try {
                leagueUrl = await AsyncStorage.getItem('leagueUrl');
                site = await AsyncStorage.getItem('site');
                teamUrl = await AsyncStorage.getItem('teamUrl');
                teamName = await AsyncStorage.getItem('teamName');
            } catch (e) {

            }

            dispatch({type: 'RESTORE_TOKEN', leagueUrl: leagueUrl, site: site, teamUrl: teamUrl, teamName: teamName});
        };

        bootstrapAsync();
    }, []);

    const authFlow = React.useMemo(
        () => ({
            selectVoivodeship: async value => {
                let url;
                try {
                    url = VOIVODESHIPS[value];
                } catch (e) {
                    alert('Błąd');
                }
                await AsyncStorage.setItem('site', value);
                dispatch({type: 'SELECT_SITE', site: value});
            },
            selectLeague: async url => {
                await AsyncStorage.setItem('leagueUrl', url);
                dispatch({type: 'SELECT_LEAGUE', leagueUrl: url});
            },
            selectTeam: async (url, name) => {
                await AsyncStorage.setItem('teamUrl', url);
                await AsyncStorage.setItem('teamName', name);
                dispatch({type: 'SELECT_TEAM', teamUrl: url, teamName: name});
            },
            signOut: async () => {
                await AsyncStorage.removeItem('leagueUrl');
                await AsyncStorage.removeItem('site');
                await AsyncStorage.removeItem('teamUrl');
                await AsyncStorage.removeItem('teamName');
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