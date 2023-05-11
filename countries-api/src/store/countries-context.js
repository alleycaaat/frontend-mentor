import { useReducer } from 'react';
import { createContext } from 'react';

export const CountriesContext = createContext({
    countries: [],
    country: '',
    borders: [],
    regions: '',
    currentPage: '',
    setCurrentPage: (data) => { },
    searchInput: (data) => { },
    setCountry: (data) => { }, // ** currently displayed country
    setCountries: (data) => { }, // ** all countries
    borderCountries: (data) => { },
    setRegion: (data) => { }, // ** currently displayed region
    setRegions: (data) => { }, // ** all regions
});

function countriesReducer(state, action) {
    switch (action.type) {
        case 'SETCOUNTRIES':
            return {
                ...state,
                countries: action.payload,
            };

        case 'SETCURRENTPAGE':
            // ** wipe the visited countries array clean if user goes back to Card.js
            if (action.payload === 'reset') {
                return {
                    ...state,
                    currentPage: undefined
                };
            }
            // ** otherwise add the country data to the visited array
            let copyHistory;
            state.currentPage === undefined ? copyHistory = [state.country] : copyHistory = [...state.currentPage, action.payload];
            return {
                ...state,
                currentPage: copyHistory
            };

        case 'BORDERCOUNTRIES':
            const duplicate = state.countries;
            let getBorderData = [];

            // ** cycle through the array, get the index of each border country
            // ** get the data from that index, push it to the array
            action.payload.forEach((element) => {
                let idx = duplicate.findIndex((el) => el.abrv === element),
                    info = duplicate[idx];
                getBorderData.push(info);
            });

            return {
                ...state,
                borders: getBorderData
            };

        case 'SETREGIONS':
            return {
                ...state,
                regions: action.payload
            };

        case 'SETREGION':
            // ** duplicate the state to keep the original in tact
            // ** filter out any countries that aren't the same region
            // ** save it to state.country so the countries of that region display

            const dup = state.countries;
            const filter = dup.filter(country => country.region === action.payload);
            return {
                ...state,
                country: filter
            };

        case 'SEARCH':
            const copy = state.countries;
            let searchIdx = copy.findIndex((search) => search.name === action.payload),
                searchResulds = copy[searchIdx];

            return {
                ...state,
                country: searchResulds
            };

        case 'SETCOUNTRY':
            return {
                ...state,
                country: action.payload
            };

        default:
            return state;
    }
}

function CountriesContextProvider({ children }) {
    const [state, dispatch] = useReducer(countriesReducer, []);

    function setCountry(data) {
        dispatch({ type: 'SETCOUNTRY', payload: data });
    }
    function setCountries(data) {
        dispatch({ type: 'SETCOUNTRIES', payload: data });
    }
    function setCurrentPage(data) {
        dispatch({ type: 'SETCURRENTPAGE', payload: data });
    }
    function searchInput(data) {
        dispatch({ type: 'SEARCH', payload: data });
    }
    function setRegion(data) {
        dispatch({ type: 'SETREGION', payload: data });
    }
    function setRegions(data) {
        dispatch({ type: 'SETREGIONS', payload: data });
    }
    function borderCountries(data) {
        dispatch({ type: 'BORDERCOUNTRIES', payload: data });
    }

    const value = {
        countries: state.countries,
        country: state.country,
        borders: state.borders,
        regions: state.regions,
        currentPage: state.currentPage,
        setCurrentPage: setCurrentPage,
        searchInput: searchInput,
        setCountry: setCountry,
        setCountries: setCountries,
        borderCountries: borderCountries,
        setRegion: setRegion,
        setRegions: setRegions,
    };

    return (
        <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>
    );
}

export default CountriesContextProvider;