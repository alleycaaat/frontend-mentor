import { useContext } from 'react';
import { CommentContext } from '../store/ContextProvider';

import Comment from './CommentCard/Comment';

const CommentSection = () => {
    const { comments } = useContext(CommentContext);

    const displaycomments = comments.map((data, i) => (
        <>
            {data.parent_id === '' && (
                <Comment
                    key={i}
                    id={data.id}
                    comments={data}
                    user={data.user}
                />
            )}
        </>
    ));

    return (
        <div className='commentSection'>
            {displaycomments}
        </div>
    );
};

export default CommentSection;