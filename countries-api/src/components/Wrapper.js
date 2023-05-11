import { useContext, useEffect } from 'react';
import { getCountries } from '../util/api';
import { CountriesContext } from '../store/countries-context';

import CardHolder from './cards/CardHolder';

const Wrapper = () => {
    const { setCountries, setCountry, setRegions } = useContext(CountriesContext);

    const getRegions = (countries) => {
        // ** pull the countries from the data recieved from the api
        // ** not the most efficient given there are 250 countries and only six regions, but it's dynamic
        const list = [...new Map(countries.map(c => [c.region, c.region])).values()];
        list.unshift(' ');

        setRegions(list);
    };

    const loadCountries = async () => {
        let countries = await getCountries();

        setCountries(countries);
        setCountry(countries);
        getRegions(countries);
    };

    useEffect(() => {
        loadCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main>
            <CardHolder />
        </main>
    );
};

export default Wrapper;