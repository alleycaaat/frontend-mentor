import { BsMoon } from 'react-icons/bs';
import { BiSun } from 'react-icons/bi';

export const Light = ({ onClick }) => {
    return (
        <button className='color-mode' onClick={onClick}>
            <BiSun aria-hidden='true' /> Light Mode
        </button>
    );
};

export const Dark = ({ onClick }) => {
    return (
        <button className='color-mode' onClick={onClick}>
            <BsMoon aria-hidden='true' /> Dark Mode
        </button>
    );
};