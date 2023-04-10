const { q, client } = require('../src/util/db');

function getKey(path) {
    return path.match(/([^\/]*)\/*$/)[0];
}
exports.handler = async (event, context) => {

    const data = JSON.parse(event.body);
    const id = getKey(event.path);
    const update = {
        data: data,
    };

    return client.query(q.Update(q.Ref(q.Collection('comments'), id), update))
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