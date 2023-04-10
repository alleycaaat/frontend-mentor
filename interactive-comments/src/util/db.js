const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
    domain: 'db.us.fauna.com',
    port: 443,
    scheme: 'https',
});


module.exports = { client, q };