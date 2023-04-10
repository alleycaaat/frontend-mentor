const { q, client } = require('../src/util/db');

exports.handler = async (event, context) => {
    return client.query(
        q.Paginate(
            q.Match(
                q.Ref('indexes/all_users')))
    )
        .then(async (response) => {
        
        const userRefs = response.data;
        const getQuery = userRefs.map((ref) => {
            return q.Get(ref);
        });

        const ret = await client.query(getQuery);
            return {
                statusCode: 200,
                body: JSON.stringify(ret),
            };
        })

        .catch((error) => {
            /* D'aw crap */
            console.log('server call error', error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};