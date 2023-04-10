import getFaunaId from './getFaunaId';

const getComments = async () => {
    try {
        const response = await fetch('/.netlify/functions/getAllComments');
        let data = await response.json();
        let comments = [];
        data.map((cmt) => {
            const key = getFaunaId(cmt);
            comments.push({
                id: key,
                content: cmt.data.content,
                createdAt: cmt.data.createdAt,
                replyingTo: cmt.data.replyingTo,
                score: cmt.data.score,
                user: cmt.data.user,
                parent_id: cmt.data.parent_id,
            });
            return comments;
        });
        return comments;
    } catch (error) {
        return console.log('get comments error:', error);
    }
};

const getCurrUser = async () => {
    try {
        const response = await fetch('/.netlify/functions/getUser');
        let userData = await response.json();
        let user = {
            image: {
                png: userData[0].data.image.png,
                webp: userData[0].data.image.webp,
            },
            username: userData[0].data.username,
        };
        return user;
    } catch (error) {
        return console.log('get current user error:', error);
    }
};

const saveNewComment = async (data) => {
    try {
        const response = await fetch('/.netlify/functions/createComment', {
            body: JSON.stringify(data),
            method: 'POST',
        });
        const reply = await response.json();
        const id = await getFaunaId(reply);
        reply.data.id = id;
        return reply.data;
    } catch (error) {
        return console.log('save new comment error:', error);
    }
};

const editComment = async (id, data) => {
    try {
        const response = await fetch(`/.netlify/functions/updateComment/${ id }`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        return console.log('edit comment error:', error);
    }
};

const eraseComment = async (id) => {
    console.log('id:', id);
    try {
        const response = await fetch('/.netlify/functions/deleteComment', {
            method: 'DELETE',
            body: JSON.stringify(id),
        });
        return response.json();
    }
    catch (error) {
        return console.log('erase comment error:', error);
    }
};

export { getComments, getCurrUser, saveNewComment, editComment, eraseComment };