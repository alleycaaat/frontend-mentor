import { useEffect, useState } from 'react';

import Card from './components/Card';
import Search from './components/Search';
import jobsData from './data.json';

function App() {
	const [state, setState] = useState([]);
	const [filters, setFilters] = useState([]);

	//set the job postings data to state
	useEffect(() => {
		setState(jobsData);
	}, []);

	const handleFilter = (jobDesc) => {
		//prevent adding multiple of the same description
		if (filters.includes(jobDesc)) {
			return;
		}

		setFilters([...filters, jobDesc]);
	};

	const filterData = (jobs) => {
		//stop the infiniate loop of doom
		if (filters.length === 0) {
			return true;
		}
		//all the possible keywords
		const filterList = [jobs.role, jobs.level, ...jobs.languages, ...jobs.tools];

		//return only the listings that contain all of the search terms
		return filters.every(filter => filterList.includes(filter));
	};

	const filteredJobs = state.filter(filterData);

	return (
		<>
			<main className='wrapper'>
				<header className='header'>
				</header>
				<Search
					filters={filters}
					setFilters={setFilters}
				/>
				<section>
					{filteredJobs.map((job, i) => (
						<Card
							key={i}
							data={job}
							handleFilter={handleFilter}
						/>
					))}
				</section>
			</main>
			<footer>
				<p>
					Challenge by <a href='https://www.frontendmentor.io?ref=challenge'
						target='_blank' rel='noopener noreferrer'>Frontend Mentor</a>.
					Coded by <a href='https://www.achulslander.com/'>AC Hulslander</a>.
				</p>
			</footer>
		</>
	);
}

export default App;
