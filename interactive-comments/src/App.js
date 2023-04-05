import { useEffect, useContext } from 'react';
import { CommentContext } from './store/ContextProvider';

import AddComment from './components/AddComment';
import CommentSection from './components/CommentSection';
import { getComments, getCurrUser } from './util/api';


function App() {

	const { setComments, setUser, currUser } = useContext(CommentContext);

	const loadUser = async () => {
		await getCurrUser()
			.then((data) =>
				setUser(data))
			.catch(error => console.log('getting user error:', error));
	};

	const loadData = async () => {
		await getComments()
			.then((data) =>
				setComments(data));
		loadUser()
			.catch(error => console.log('get comments error:', error));
	};

	useEffect(() => {
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		currUser !== undefined && (
			<main>
				<CommentSection />
				<AddComment />
			</main>
		)
	);
}

export default App;
