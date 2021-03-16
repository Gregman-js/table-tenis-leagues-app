import React, {useContext} from 'react';
import {AsyncStorage} from 'react-native';
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
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        site: null,
                        leagueUrl: null,
                        teamUrl: null,
                    };
            }
        },
        {
            isLoading: true,
            site: null,
            leagueUrl: null,
            teamUrl: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let leagueUrl;
            let site;
            let teamUrl;

            try {
                leagueUrl = await AsyncStorage.getItem('leagueUrl');
                site = await AsyncStorage.getItem('site');
                teamUrl = await AsyncStorage.getItem('teamUrl');
            } catch (e) {

            }

            dispatch({type: 'RESTORE_TOKEN', leagueUrl: leagueUrl, site: site, teamUrl: teamUrl});
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
            selectTeam: async url => {
                await AsyncStorage.setItem('teamUrl', url);
                dispatch({type: 'SELECT_TEAM', teamUrl: url});
            },
            signOut: async () => {
                await AsyncStorage.removeItem('leagueUrl');
                await AsyncStorage.removeItem('site');
                await AsyncStorage.removeItem('teamUrl');
                dispatch({type: 'SIGN_OUT'});
            },
        }),
        []
    );

    const authValues = {
        ...authFlow,
        authState: state
    }

    // console.log(state)

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    )
}