import { useContext, useState } from 'react';

import { CommentContext } from '../../store/ContextProvider';
import { saveNewComment } from '../../util/api';

export const AddReply = ({ parent, setIsReplying, replyingTo }) => {
    const { addComment, currUser } = useContext(CommentContext);

    const [newComment, setNewComment] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const value = newComment.trim();

        if (value.length > 0) {
            const date = new Date();
            const data = {
                content: value,
                createdAt: date,
                replyingTo: replyingTo,
                score: 0,
                user: currUser,
                parent_id: parent,
            };

            addComment(data);
            saveNewComment(data);
            setNewComment('');
            setIsReplying({replying: false, comment_id: ''})
        }
    };

    return (
        <form className='add-comment' onSubmit={submitHandler}>
            <textarea
                placeholder='Reply to comment...'
                value={newComment}
                onChange={(e) => { setNewComment(e.target.value); }}
            />
            <span>
                <img src={currUser.image.png} alt={`${ currUser.userName } icon`} />
                <button>Send</button>
            </span>
        </form>
    );
};