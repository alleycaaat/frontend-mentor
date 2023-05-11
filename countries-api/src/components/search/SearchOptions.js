import React from 'react';
import Search from './Search';
import Dropdown from '../Dropdown';

const SearchOptions = ({ setAlert, alert }) => {
    return (
        <div className='option-wrap'>
            <Search setAlert={setAlert} alert={alert} />
            <Dropdown />
            <p className='search-p'>{alert}</p>
        </div>
    );
};

export default SearchOptions;