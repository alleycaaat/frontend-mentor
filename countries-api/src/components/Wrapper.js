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
        list.unshift('Filter by Region');

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
            <div id='bannerLinks'>
                <a target='_blank'
                    href='https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca/hub' rel='noreferrer noopener'>
                    Challenge
                </a>
                <a target='_blank'
                    href='https://github.com/alleycaaat/frontend-mentor/tree/main/countries-api'
                    rel='noreferrer noopener'>
                    AC's Solution
                </a>
            </div>
        </main>
    );
};

export default Wrapper;