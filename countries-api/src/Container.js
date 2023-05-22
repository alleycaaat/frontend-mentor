import React, { useContext } from 'react';
import { ThemeContext } from './store/theme-context';


import Wrapper from './components/Wrapper';
import { Dark, Light } from './constants/header-buttons';

const Container = () => {
    const { darkMode, toggleMode } = useContext(ThemeContext);

    return (
        <div className={darkMode ? 'container dark-mode' : ' container light-mode'}>
            <header className='header'>
                <p>Where in the world?</p>
                {darkMode
                    ? <Light onClick={toggleMode} />
                    : <Dark onClick={toggleMode} />
                }
            </header>
            <Wrapper />
        </div>
    );
};

export default Container;