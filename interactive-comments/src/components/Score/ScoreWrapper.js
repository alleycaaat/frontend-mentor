import EditDeleteBtns from '../EditComment/EditDeleteBtns';
import ScoreCard from './ScoreCard';
import ReplyBtn from '../ui/ReplyBtn';

// ***
// ** shows the comment score
// ** displays edit and delete options if it's the logged in user
// ***

const Score = ({ score, isCurrUser, id, setIsReplying }) => {

    return (
        <div className='buttons'>
            <ScoreCard id={id} score={score} />
                <span className='smallscreenButtons'>
            {isCurrUser ? (
                <EditDeleteBtns id={id} />
            ) :
                <ReplyBtn id={id} score={score} setIsReplying={setIsReplying} />
                }
            </span>
        </div>
    );
};

export default Score;