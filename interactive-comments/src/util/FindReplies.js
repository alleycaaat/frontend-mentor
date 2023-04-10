import { useContext } from 'react';
import { CommentContext } from '../store/ContextProvider';

const FindReplies = (id) => {
    const { comments } = useContext(CommentContext);

    const filter = comments.filter((comment) => {
        return comment.parent_id === id;
    });
    return filter;
};

export default FindReplies;