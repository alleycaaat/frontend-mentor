import { createContext, useReducer } from 'react';

import CommentReducer from './CommentReducer';

export const CommentContext = createContext({
    currUser: '',
    comments: [],
    warning: false,
    currComment: '',
    editing: false,
    setEditing: (data, id) => { },
    setWarning: (data, id) => { },
    setComments: (data) => { },
    setUser: (user) => { },
    addComment: (comment) => { },
    deleteComment: (id) => { },
    modComment: (id, data) => { },
    reply: (comment) => { },
});

function CommentContextProvider({ children }) {
    const [state, dispatch] = useReducer(CommentReducer, []);

    function setEditing(data, id) {
        dispatch({ type: 'SET_EDITING', payload: { data: data, id: id } });
    }
    function setWarning(data, id) {
        dispatch({ type: 'SET_WARNING', payload: { data: data, id: id } });
    }
    function setComments(data) {
        dispatch({ type: 'SET_COMMENTS', payload: data });
    }
    function setUser(user) {
        dispatch({ type: 'SET_USER', payload: user });
    }
    function addComment(data) {
        dispatch({ type: 'ADD_COMMENT', payload: data });
    }
    function deleteComment(id) {
        dispatch({ type: 'DELETE_COMMENT', payload: id });
    }
    function modComment(id, data) {
        dispatch({ type: 'EDIT_COMMENT', payload: { id: id, data: data } });
    }
    function reply(comment) {
        dispatch({ type: 'REPLY', payload: comment });
    }

    const value = {
        currUser: state.currUser,
        comments: state.comments,
        currComment: state.currComment,
        warning: state.warning,
        editing: state.editing,
        setEditing: setEditing,
        setComments: setComments,
        setWarning: setWarning,
        setUser: setUser,
        addComment: addComment,
        deleteComment: deleteComment,
        modComment: modComment,
        reply: reply,
    };

    return (
        <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
    );
};

export default CommentContextProvider;


/*

const scoreComments = [...state.comments]
            const getComment = scoreComments.filter(
                (comment) => comment.id === action.payload.id
            );

            console.log('typeof:', getComment)
            const updateScore = getComment[0].score
            const updatedScore = action.payload.direction === 'minus'
            ? updateScore - 1
            : updateScore + 1
            console.log('comment:', typeof updatedScore)
            return {
                ...state,
                comments: [...]
            }

            */