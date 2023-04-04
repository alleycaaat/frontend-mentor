import { useState, useEffect, useContext } from 'react';
import { CommentContext } from './store/ContextProvider';

import AddComment from './components/AddComment';
import CommentSection from './components/CommentSection';

function App() {

	const { user } = useContext(CommentContext);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (user !== null) {
			setLoading(false);
		}
	}, []);



	return (
		!loading && (
			<main>
				<CommentSection />
				<AddComment />
			</main>
		)
	);
}

export default App;
