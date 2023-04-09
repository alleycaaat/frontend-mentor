import { useContext, useState } from 'react';

import { CommentContext } from '../../store/ContextProvider';
import { AddReply } from '../Reply/AddReply';
import { Edit } from '../EditComment/Edit';

import FindReplies from '../../util/FindReplies';
import formatDate from '../../util/formatDate';

import Score from '../Score/ScoreWrapper';
import CommentTxt from './CommentTxt';
import Reply from '../Reply/Reply';
import Info from './Info';

// ***
// ** only display parent comments
// ***

const Comment = ({ comment, user, id }) => {
    const { currUser, editing } = useContext(CommentContext);
    const { createdAt, score, content } = comment;
    const { username } = user;
    const isCurrUser = currUser.username === user.username;

    const [isReplying, setIsReplying] = useState({
        replying: false,
        comment_id: '',
    });

    // eslint-disable-next-line no-unused-vars
    const { replying, comment_id } = isReplying;
    const replies = FindReplies(id);
    let date = formatDate(createdAt);

    return (
        <>
            {editing ? <Edit id={id} currComment={comment} />
                : (
                    <div className='comment'>
                        <Info
                            user={user}
                            createdAt={date}
                            isCurrUser={isCurrUser}
                        />
                        <CommentTxt>{content}</CommentTxt>
                        <Score
                            id={id}
                            score={score}
                            isCurrUser={isCurrUser}
                            setIsReplying={setIsReplying}
                        />
                    </div>
                )}
            {replying &&
                <AddReply
                    parent={id}
                    replyingTo={username}
                    setIsReplying={setIsReplying}
                />
            }
            {replies.length > 0 && (
                <Reply
                    parent={id}
                />
            )}
        </>
    );
};

export default Comment;