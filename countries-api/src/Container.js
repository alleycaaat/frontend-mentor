import React, { useContext } from 'react';
import { ThemeContext } from './store/theme-context';

import { BsMoon } from 'react-icons/bs';
import Wrapper from './components/Wrapper';

const Container = () => {
    const { darkMode, toggleMode } = useContext(ThemeContext);

    return (
        <div className={darkMode ? 'container dark-mode' : ' container light-mode'}>
            <header className='header'>
                <p>Where in the world?</p>
                <button className='color-mode' onClick={toggleMode}>
                    <BsMoon aria-hidden='true' /> Dark Mode
                </button>
            </header>
            <Wrapper />
        </div>
    );
};

export default Container;