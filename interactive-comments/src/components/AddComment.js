import { useContext, useState } from 'react';

import { CommentContext } from '../store/ContextProvider';
import { saveNewComment } from '../util/api';

const AddComment = () => {
	const { addComment, currUser } = useContext(CommentContext);

	const [newComment, setNewComment] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();
		const value = newComment.trim();

		if (value.length > 0) {
			const date = new Date();
			const data = {
				id: Math.random(),
				content: value,
				createdAt: date,
				replyingTo: '',
				score: 0,
				user: currUser,
				parent_id: '',
			};

			// ***
			// ** saved makes an api call to the server to save the new comment and returns the comment with the fauna id

			//const saved = await saveNewComment(data);

			//addComment(saved);
			addComment(data);
			setNewComment('');
		}
	};
	return (
		<form className='add-comment' onSubmit={submitHandler}>
			<textarea
				placeholder='Add a comment...'
				value={newComment}
				onChange={(e) => { setNewComment(e.target.value); }}
			/>
			<div>
				<img src={currUser.image.png} alt={`${ currUser.userName } icon`} />
				<button>Send</button>
			</div>
		</form>
	);
};

export default AddComment;