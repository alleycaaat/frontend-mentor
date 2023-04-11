import Button from './Button';
import reply from '../../assets/icons/icon-reply.svg';
import ReplyIcon from './ReplyIcon';

const ReplyBtn = ({ setIsReplying, id }) => {
    return (
        <Button
            className='replyBtn'
            image={reply}
            aria-label='reply button'
            onClick={() => setIsReplying({ replying: true, comment_id: id })}
        >
            <ReplyIcon />
            {' '}Reply
        </Button>
    );
};

export default ReplyBtn;