const { q, client } = require('../src/util/db');

exports.handler = async (event, context) => {

    const id = event.body.replace(/"/g, '');
console.log('delete id:',id)
    return client
        .query(q.Delete(q.Ref(q.Collection('comments'), id)))
        .then((response) => {
            console.log('Success', response);
            /* Victory! */
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            console.log('Error', error);
            /* D'aw crap */
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });


};