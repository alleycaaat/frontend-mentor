import { useContext, useEffect, useState } from 'react';
import { CountriesContext } from '../../store/countries-context';

import SearchOptions from '../search/SearchOptions';
import SingleCountry from './SingleCountry';

import LoadingCards from './LoadingCards';
import Card from './Card';

const CardHolder = () => {
    const { country, borderCountries, setCountry } = useContext(CountriesContext);

    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState(country);
    const [singleCountry, setSingleCountry] = useState(false);
    const [alert, setAlert] = useState('');

    useEffect(() => {
        country === undefined ? setLoading(true) : setData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country]);

    const setData = () => {
        setLoading(false);
        country?.length === undefined
            ? handleBorders(country)
            : setDisplay(country);
    };

    // ** user clicks to view single country
    // ** get the data from ctx, set it, get borders, set them
    const handleClick = (e) => {
        let data = country[e.currentTarget.value];
        setCountry(data);
    };

    const handleBorders = (data) => {
        borderCountries(data.borders);
        setSingleCountry(true);
    };

    // ** prevDisplay={display}: save what list is currently showing as CardHolder.js and SearchCard.js display country from context

    return (
        <div className='card-wrapper'>
            {loading ?
                <LoadingCards />
                : singleCountry
                    ? <SingleCountry
                        setSingleCountry={setSingleCountry}
                        prevDisplay={display}
                    />
                    : <>
                        <SearchOptions
                            setAlert={setAlert}
                            alert={alert}
                        />

                        {display.map((cntry, i) => (
                            <Card
                                country={cntry}
                                key={i} val={i}
                                handleClick={(e) => handleClick(e)}
                            />
                        ))}
                    </>
            }
        </div>
    );
};

export default CardHolder;