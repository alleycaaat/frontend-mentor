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
        <span className='score'>
            <Button
                onClick={() => ModScore('plus')}
                className='scoreBtn'
                alt='plus icon'
            >
                <PlusIcon />
            </Button>
            <p>{score}</p>
            <Button
                onClick={() => ModScore('minus')}
                className='scoreBtn'
                alt='minus icon'
            >
                <MinusIcon />
            </Button>
        </span>
    );
};

export default ScoreCard;