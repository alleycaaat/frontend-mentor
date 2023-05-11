export const Info = ({ data, children }) => {
    return (
        <div>
            <p>{children}</p>
            <p>{data}</p>
        </div>
    );
};

export const BorderButtons = ({ countries, onClick }) => {
    return (
        <div className='borders'>
            <p>Border Countries:</p>
            {countries.map((cntry, i) => (
                <button
                    onClick={onClick} className='border-button'
                    key={i}
                    value={i}>
                    {cntry.name}
                </button>
            ))}
        </div>
    );
};