import { useContext, useEffect, useState } from 'react';
import { CountriesContext } from '../../store/countries-context';

import { BiSearch } from 'react-icons/bi';

const Search = ({ setAlert, alert }) => {
    const { searchInput, country } = useContext(CountriesContext);

    const [searchVal, setSearchVal] = useState('');


    useEffect(() => {
        const handleEnter = (e) => {
            if (e.key === 'Enter' && searchVal !== '') {
                searchInput(searchVal);
            }
            if (e.key === 'Enter' && country === undefined) {
                setAlert('No matches found');
            }
        };

        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchVal, country]);

    useEffect(() => {
        const resetAlert = setTimeout(() => setAlert(''), 3000);
        return () => clearTimeout(resetAlert);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alert]);

    const submit = () => {
        if (searchVal !== '') searchInput(searchVal);
    };

    return (
        <div className='search'>
            <button
                onClick={submit}
                aria-label='submit search'
            >
                <BiSearch aria-hidden='true' />
            </button>
            <input
                type='text'
                placeholder='Search for a country...'
                onChange={e => setSearchVal(e.target.value)}
            />
        </div>
    );
};

export default Search;