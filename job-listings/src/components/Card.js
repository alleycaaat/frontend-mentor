import Button from './Button';

const Card = ({ data, handleFilter }) => {

    const arr = [data.role, data.level, ...data.languages, ...data.tools];

    return (
        <div className={`${ data.featured ? 'featured posting' : 'posting' }`}>
            <img src={data.logo} alt={`${ data.company } logo`} />

            <div className='container'>

                <div className='heading'>
                    <h2 className='company'>{data.company}</h2>
                    <div className='alerts'>
                        {data.new && <p>New!</p>}
                        {data.featured && <p>Featured</p>}
                    </div>
                </div>

                <p className='position'>{data.position}</p>
                <div className='details'>
                    {data.postedAt}{' | '}{data.contract}{' | '}{data.location}
                </div>

            </div>
            <div className='desc'>
                {arr.map((btn, i) => (
                    <Button
                        key={i}
                        desc={btn}
                        onClick={() => handleFilter(btn)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Card;