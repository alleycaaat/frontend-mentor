import { useContext } from 'react';
import { CommentContext } from '../../store/ContextProvider';

import DeleteIcon from '../ui/DeleteIcon';
import EditIcon from '../ui/EditIcon';
import Button from '../ui/Button';

const EditDeleteBtns = ({ id }) => {
    const { setWarning, setEditing } = useContext(CommentContext);

    const deleteHandler = () => {
        setWarning(true, id);
    };

    const editHandler = (e) => {
        e.preventDefault();
        setEditing(true, id);
    };

    return (
        <div className='editbuttons'>
            <Button
                onClick={deleteHandler}
                className='delete'
                aria-label='delete comment'
            >
                <DeleteIcon />{' '}Delete
            </Button>

            <Button
                onClick={editHandler}
                className='edit'
                aria-label='edit comment'
            >
                <EditIcon />{' '}Edit
            </Button>
        </div>
    );
};

export default EditDeleteBtns;