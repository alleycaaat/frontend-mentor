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
		try {
			const response = await getCurrUser();
			setUser(response);
		}
		catch (error) { console.log('getting user error:', error); };
	};

	//get the comments, sort them by score
	const loadData = async () => {
		try {
			const data = await getComments();
			const sortComments = await data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
			setComments(sortComments);
			loadUser();
			return;
		}
		catch (error) { console.log('get comments error:', error); };
	};

	// prevent background scroll when the modal is open
	useEffect(() => {
		if (warning) document.body.style.overflow = 'hidden';
		else {
			document.body.style.overflowY = 'scroll';
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
