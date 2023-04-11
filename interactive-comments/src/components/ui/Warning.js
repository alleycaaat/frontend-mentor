import { useContext, useEffect, useRef, useState } from 'react';

import { CommentContext } from '../../store/ContextProvider';
import { eraseComment } from '../../util/api';

import Button from './Button';

const Warning = () => {
    const { deleteComment, setWarning, setEditing, currComment } = useContext(CommentContext);
    const focusRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        focusRef.current.focus();
    }, []);

    const cancel = () => {
        setWarning(false, '');
        setEditing(false, '');
    };

    const confirm = () => {
        // ***
        // ** eraseComment is an api call
        //eraseComment(currComment);
        deleteComment(currComment);
        setWarning(false, '');
    };

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === 'Escape' ? setWarning(false) : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div
            className='warning'
            role='dialog'
            aria-modal='true'
            aria-labelledby='dialog_label'
            aria-describedby='dialog_desc'
            ref={focusRef}
            tabIndex='-1'
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
        >
            <div className='warningtxt'>
                <h2 id='dialog_label' className='dialog_label'>Delete comment</h2>
                <p id='dialog_desc' className='dialog_desc'>Are you sure you wish to delete this comment?  This will remove the comment and cannot be undone.</p>
                <div className='buttonWrapper'>
                    <Button
                        className='cancelWarning'
                        onClick={cancel}
                    >
                        No, cancel
                    </Button>
                    <Button
                        className='confirmWarning'
                        onClick={confirm}
                    >
                        Yes, Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Warning;