import { SearchBtn } from './SearchBtn';

const Search = ({ filters, setFilters }) => {
    const clearHandler = () => {
        setFilters([]);
    };

    //remove filter
    const filter = (job) => {
        setFilters(filters.filter(f => f !== job));
    };

    return (
        filters.length > 0 ? (
            <div className='search'>
                <ul>
                    {filters.map((job, i) => (
                        <SearchBtn key={i} job={job} onClick={() => filter(job)} />
                    ))}
                </ul>
                <button className='clear' onClick={clearHandler}>Clear</button>
            </div>
        )
            : <div className='search hidden'></div>
    );
};


export default Search;