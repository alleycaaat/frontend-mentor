import { useContext } from 'react';
import { CommentContext } from '../../store/ContextProvider';
import { editComment } from '../../util/api';

import AdjustScore from '../../util/AdjustScore';
import MinusIcon from '../ui/MinusIcon';
import PlusIcon from '../ui/PlusIcon';
import Button from '../ui/Button';

const ScoreCard = ({ score, id }) => {
    const { modComment, comments } = useContext(CommentContext);

    const ModScore = (direction) => {
        const update = AdjustScore(comments, id, direction);

        modComment(id, update);
        // ***
        // ** editComment is an api call
        //editComment(id, update);
    };

    return (
        <div className='score'>
            <Button
                onClick={() => ModScore('plus')}
                className='scoreBtn'
                aria-label='increase score'
            >
                <span className='visually-hidden'>Increase the comment score</span>
                <PlusIcon />
            </Button>
            <p>{score}</p>
            <Button
                onClick={() => ModScore('minus')}
                className='scoreBtn'
                aria-label='decrease score'
            >
                <span className='visually-hidden'>Decrease the comment score</span>
                <MinusIcon />
            </Button>
        </div>
    );
};

export default ScoreCard;