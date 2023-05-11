import { useContext, useState } from 'react';
import { CountriesContext } from '../store/countries-context';

const Dropdown = () => {
    const { regions, setRegion } = useContext(CountriesContext);
    const [expanded, setExpanded] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(false);

    const handleRegion = (data) => {
        let selected = data.target.value;
        selected === ' ' ? showLabel() : changeRegion(selected);
    };

    const showLabel = () => {
        setSelectedRegion(false);
        setExpanded(false);
    };

    const changeRegion = (selected) => {
        setSelectedRegion(true);
        setRegion(selected);
        setExpanded(false);
    };

    return (
        <div className='drop-down'>
            <div className={selectedRegion ? 'hidden' : 'show'}>Filter by Region
            </div>
            <label htmlFor='filter' className='hidden'>Filter by Region</label>
            <select
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