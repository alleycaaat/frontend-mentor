import { useContext, useEffect, useRef, useState } from 'react';
import { CountriesContext } from '../../store/countries-context';
import { BorderButtons, Info } from '../../constants/card-info';
import { BsArrowLeft } from 'react-icons/bs';

const SingleCountry = ({ setSingleCountry, prevDisplay }) => {
    const { country, borders, borderCountries, setCurrentPage, currentPage, setCountry } = useContext(CountriesContext);

    // ** currentPage is the country currently being visited
    // ** setCurrentPage is an array that holds the data of previous countries visited

    const { flag, alt, name, native, population, region, subregion, capital, domain, currency, languages } = country;

    const [count, setCount] = useState(0);
    const isFirstRender = useRef(true);

    // ** on first render set the country to currentPage
    useEffect(() => {
        if (isFirstRender.current) {
            setCurrentPage(country);
            isFirstRender.current = false;
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let nativeName = Object.values(native.nativeName)[0]?.common,
        lang,
        money;

    for (const props in currency) {
        money = currency[props];
    }

    const handleClick = (e) => {
        let index = e.target.value,
            add = count + 1;

        setCount(add); // ** incriment the index count
        borderCountries(borders[index].borders); // ** set the new border countries
        setCurrentPage(borders[index]); // ** add the country to the visited array
        setCountry(borders[index]); // ** show the new country
    };

    const handleBack = () => {
        // ** at the first country from the display list? go back to the list
        if (count === 0 || currentPage === undefined) {
            setSingleCountry(false);
            setCurrentPage('reset');
            // ** send back the list to display
            setCountry(prevDisplay);
            return;
        }
        // ** otherwise decriment the count, remove the country from the visited array
        let minus = count - 1;
        setCount(minus);
        setCountry(currentPage[minus]);
    };

    const getLangs = () => {
        if (!languages) return;
        return lang = Object.values(languages);
    };

    getLangs();

    return (
        <div className='single-country'>
            <button
                className='back-button'
                onClick={handleBack}>
                <BsArrowLeft /> Back
            </button>

            <div className='search-card'>
                <div className='flag'
                    style={{ backgroundImage: `url(${ flag })` }}
                    alt={alt} />

                <div className='desktop'>
                    <div className='stats'>
                        <p className='country'>{name}</p>
                        <Info data={nativeName}>Native Name:</Info>
                        <Info data={population}>Population:</Info>
                        <Info data={region}>Region:</Info>
                        <Info data={subregion}>Sub Region:</Info>
                        <Info data={capital}>Capital:</Info>
                    </div>

                    <div className='stats'>
                        <Info data={domain}>Top Level Domain:</Info>
                        <Info data={money?.name}>Currencies:</Info>
                        <Info data={lang.join(', ')}>Languages:</Info>
                    </div>
                    <BorderButtons
                        countries={borders}
                        onClick={e => handleClick(e)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleCountry;