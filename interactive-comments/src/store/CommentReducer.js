function CommentReducer(state, action) {
    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                ...state,
                comments: [...action.payload]
            };

        case 'SET_USER':
            return {
                ...state,
                currUser: action.payload
            };

        case 'SET_WARNING':
            return {
                ...state,
                warning: action.payload.data,
                currComment: action.payload.id
            };

        case 'SET_EDITING':
            return {
                ...state,
                editing: action.payload.data,
                currComment: action.payload.id
            };

        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };

        case 'DELETE_COMMENT':
            const allComments = [...state.comments];
            const filter = allComments.filter((comment) => {
                return comment.id !== action.payload;
            });
            return { ...state, comments: [...filter] };

        case 'EDIT_COMMENT':
            const comments = [...state.comments];
            const commentId = comments.findIndex(
                (comment) => comment.id === action.payload.id
            );
            const updateComment = comments[commentId];
            const updatedComment = { ...updateComment, ...action.payload.data };
            const updatedComments = [...state.comments];
            updatedComments[commentId] = updatedComment;
            return { ...state, comments: [...updatedComments] };

        case 'REPLY':
            const currComments = [...state.comments];
            const reply = {
                id: action.reply.id,
                content: action.reply.content,
                createdAt: action.reply.createdAt,
                score: action.reply.score,
                replyingTo: action.reply.replyingTo,
                user: {
                    image: { ...action.reply.user.image },
                    username: action.reply.user.username
                },
            };
            return [...currComments, reply];

        default:
            return state;
    }
}

export default CommentReducer;