import { useContext, useState } from 'react';
import { CommentContext } from '../../store/ContextProvider';

import { AddReply } from './AddReply';

import Score from '../Score/ScoreWrapper';
import FindReplies from '../../util/FindReplies';
import formatDate from '../../util/formatDate';

import ReplyTxt from './ReplyTxt';
import Info from '../CommentCard/Info';
import { Edit } from '../EditComment/Edit';

// ***
// ** only displays replies
// ** reply option is nested under the comment being replied to
// ***

const Reply = ({ parent }) => {
    const { currUser, editing, currComment } = useContext(CommentContext);
    const [isReplying, setIsReplying] = useState({
        replying: false,
        comment_id: '',
    });
    const current = currUser.username;

    const { replying, comment_id } = isReplying;
    const replies = FindReplies(parent);

    //sort replies by date
    const sortReplies = replies?.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    const replyComments = (sortReplies?.map((reply, i) => (
        <div key={i}>
            <div
                className='reply'
            >
                <div className='largescreenScore'>
                    <Score
                        id={reply.id}
                        score={reply.score}
                        isCurrUser={reply.user.username === current}
                        setIsReplying={setIsReplying}
                    />
                </div>
                <div className='smallscreenScore'>
                    <Info
                        id={reply.id}
                        setIsReplying={setIsReplying}
                        createdAt={formatDate(reply.createdAt)}
                        isCurrUser={reply.user.username === current}
                        user={reply.user.username === current ? currUser : reply.user}
                    />
                    {editing && reply.id === currComment
                        ? <Edit
                            id={reply.id}
                            editCmnt={reply}
                        />
                        :
                        <ReplyTxt
                            replyingTo={reply.replyingTo}
                            content={reply.content}
                        />}
                    <Score
                        id={reply.id}
                        score={reply.score}
                        setIsReplying={setIsReplying}
                        isCurrUser={reply.user.username === current}
                    />
                </div>
            </div>
            {
                (replying && comment_id === reply.id) &&
                <AddReply
                    parent={parent}
                    setIsReplying={setIsReplying}
                    replyingTo={reply.user.username}
                />
            }
        </div>
    )));

    return (
        <div className='replies'>
            {replyComments}
        </div>
    );
};

export default Reply;