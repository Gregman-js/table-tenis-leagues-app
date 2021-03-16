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
                        fullyConfigured: action.fullyConfigured,
                        isLoading: false,
                    };
                case 'SELECT_SITE':
                    return {
                        ...prevState,
                        site: action.site,
                        fullyConfigured: action.site && prevState.leagueUrl,
                    };
                case 'SELECT_LEAGUE':
                    return {
                        ...prevState,
                        leagueUrl: action.leagueUrl,
                        fullyConfigured: action.leagueUrl && prevState.site,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        site: null,
                        leagueUrl: null,
                        fullyConfigured: false,
                    };
            }
        },
        {
            isLoading: true,
            site: null,
            leagueUrl: null,
            fullyConfigured: false,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let leagueUrl;
            let site;

            try {
                leagueUrl = await AsyncStorage.getItem('leagueUrl');
                site = await AsyncStorage.getItem('site');
            } catch (e) {

            }

            let fullyConfigured = false;

            if (leagueUrl && site) {
                fullyConfigured = true;
            }

            console.log("Restored: ", site, leagueUrl, fullyConfigured);

            dispatch({type: 'RESTORE_TOKEN', leagueUrl: leagueUrl, site: site, fullyConfigured: fullyConfigured});
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
            signOut: async () => {
                await AsyncStorage.removeItem('leagueUrl');
                await AsyncStorage.removeItem('site');
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