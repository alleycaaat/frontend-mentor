import { useContext } from 'react';
import { CommentContext } from '../store/ContextProvider';

import Comment from './CommentCard/Comment';

// ***
// ** only send parent comment data to Comment component
// ***

const CommentSection = () => {
    const { comments } = useContext(CommentContext);

    const displaycomments = comments.map((data, i) => (
        <div key={i}>
            {data.parent_id === '' && (
                <Comment
                    key={i}
                    id={data.id}
                    comment={data}
                    user={data.user}
                />
            )}
        </div>
    ));

    return (
        <div className='commentSection'>
            {displaycomments}
        </div>
    );
};

export default CommentSection;