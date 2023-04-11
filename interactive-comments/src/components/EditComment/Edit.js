import { useContext, useState } from 'react';
import { CommentContext } from '../../store/ContextProvider';
import { editComment } from '../../util/api';

export const Edit = ({ id, editCmnt }) => {
    const { modComment, setEditing } = useContext(CommentContext);

    const { content, createdAt, replyingTo, score, user, parent_id, } = editCmnt;
    const [comment, setComment] = useState(content);

    const submitHandler = async (e) => {
        e.preventDefault();
        const value = comment;

        if (value.length > 0) {
            const data = {
                content: value,
                createdAt: createdAt,
                replyingTo: replyingTo,
                score: score,
                user: user,
                parent_id: parent_id,
            };

            try {
                // ***
                // ** editComment is an api call
                //editComment(id, data);
                modComment(id, data);
                setEditing(false);
            } catch (error) {
                return console.log('editing error:', error);
            }
        }
    };

    return (
        <form className='edit-comment' onSubmit={submitHandler}>
            <textarea
                placeholder={comment}
                value={comment}
                onChange={(e) => { setComment(e.target.value); }}
            />
            <button>Update</button>
        </form>
    );
};