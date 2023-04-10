const { q, client } = require('../src/util/db');

exports.handler = async (event, context) => {

    const data = JSON.parse(event.body);

    return client.query(q.Create(q.Collection('comments'), {
        data: {
            content: data.content,
            createdAt: data.createdAt,
            replyingTo: data.replyingTo,
            score: 0,
            user: data.user,
            parent_id: data.parent_id,
        }
    }
    ))
        .then((response) => {
            console.log('Success', response);
            /* Victory! */
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            console.log('server call error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};