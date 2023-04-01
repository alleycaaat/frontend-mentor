import closeicon from '../assets/icon-remove.svg';

export const SearchBtn = ({ onClick, job }) => {
    return (
        <li onClick={onClick}>
            <button className='descBtn'>{job}</button>
            <img src={closeicon} alt='remove icon' />
        </li>
    );
};