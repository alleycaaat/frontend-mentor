import { Info } from '../../constants/card-info';

const Card = ({ handleClick, country, val }) => {
    return (
        <div role='button' onClick={handleClick} className='card' id={val} >
            <div className='flag'
                style={{ backgroundImage: `url(${ country.flag })` }} />
            <p className='sr-only'>{`${ country?.name }'s flag description: ${ country?.alt }`}</p>

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