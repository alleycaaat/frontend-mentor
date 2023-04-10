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
// ** only displaying parent comments, determine if replies present
// ** allow ability a reply directly to a parent comment
// ***

const Comment = ({ comment, user, id }) => {
    const { currUser, editing, currComment } = useContext(CommentContext);
    const { createdAt, score, content } = comment;
    const { username } = user;
    const isCurrUser = currUser.username === user.username;

    const [isReplying, setIsReplying] = useState({
        replying: false,
        comment_id: '',
    });

    // eslint-disable-next-line no-unused-vars
    const { replying, comment_id } = isReplying;

    //determine if there are replies to the parent
    const replies = FindReplies(id);

    //format the date to show time elapsed since posting
    let date = formatDate(createdAt);

    return (
        <>
            <div className='comment' key={id}>
                <div className='largescreenScore'>
                    <Score
                        id={id}
                        score={score}
                        isCurrUser={isCurrUser}
                        setIsReplying={setIsReplying}
                    />
                </div>
                <div className='smallscreenScore'>
                    <Info
                        id={id}
                        user={user}
                        createdAt={date}
                        isCurrUser={isCurrUser}
                        setIsReplying={setIsReplying}
                    />
                    {editing && id === currComment
                        ? <Edit
                            id={id}
                            editCmnt={comment}
                        />
                        : <CommentTxt>{content}</CommentTxt>
                    }
                    <Score
                        id={id}
                        score={score}
                        isCurrUser={isCurrUser}
                        setIsReplying={setIsReplying}
                    />
                </div>
            </div>
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