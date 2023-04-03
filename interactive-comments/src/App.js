import { useState, useEffect } from 'react';

import CommentSection from './components/CommentSection';
import data from './data.json';

function App() {
	const [user, setUser] = useState();
	const [comments, setComments] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setUser(data.currentUser);
		setComments(data.comments);
		setLoading(false);
	}, []);


	return (
		!loading && (
			<main>
				<CommentSection user={user} comments={comments} />
			</main>
		)
	);
}

export default App;
