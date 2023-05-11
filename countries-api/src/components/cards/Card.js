import { Info } from '../../constants/card-info';

const Card = ({ handleClick, country, val }) => {
    return (
        <div role='button' onClick={handleClick} className='card' value={val} >
            <div className='flag'
                style={{ backgroundImage: `url(${ country.flag })` }}
                alt={country.alt} />

            <div className='stats'>
                <p className='country'>{country?.name}</p>
                <Info data={country?.population}>Population:</Info>
                <Info data={country?.region}>Region:</Info>
                <Info data={country?.capital}>Capital:</Info>
            </div>
        </div>
    );
};

export default Card;