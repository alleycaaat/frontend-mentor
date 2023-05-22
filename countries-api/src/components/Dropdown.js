import { useContext, useState } from 'react';
import { CountriesContext } from '../store/countries-context';

const Dropdown = () => {
    const { regions, setRegion, countries, setCountry } = useContext(CountriesContext);
    const [expanded, setExpanded] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [selectedRegion, setSelectedRegion] = useState(false);

    const handleRegion = (data) => {
        let selected = data.target.value;
        selected === 'Filter by Region' ? reset() : changeRegion(selected);
    };

    const reset = () => {
        setSelectedRegion(false);   
        setCountry(countries);
        setExpanded(false);
    };

    const changeRegion = (selected) => {
        setSelectedRegion(true);
        setRegion(selected);
        setExpanded(false);
    };

    return (
        <div className='drop-down'>
            <select
                aria-label='select a region'
                id='filter'
                onFocus={() => setExpanded(true)}
                onBlur={() => setExpanded(false)}
                onChange={handleRegion}
                aria-expanded={expanded}>
                {regions.map((data, i) => (
                    <option
                        key={i}
                        value={data}>{data}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;