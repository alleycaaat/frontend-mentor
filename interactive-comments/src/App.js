import { createPortal } from 'react-dom';
import { useEffect, useContext } from 'react';
import { CommentContext } from './store/ContextProvider';
import { getComments, getCurrUser } from './util/api';

import AddComment from './components/AddComment';
import CommentSection from './components/CommentSection';
import Warning from './components/ui/Warning';


function App() {
	const { setComments, setUser, currUser, warning, setWarning } = useContext(CommentContext);

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
		if (warning) document.body.style.overflow = 'hidden';
		else {
			document.body.style.overflow = 'scroll';
		}
	}, [warning]);


	useEffect(() => {
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		currUser !== undefined && (
			<main>
				{warning && createPortal(
					<Warning onClose={() => setWarning(false)} />,
					document.body
				)}
				<CommentSection />
				<AddComment />
			</main>
		)
	);
}

export default App;
