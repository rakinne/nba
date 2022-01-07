const couchbase = require('couchbase')
const fetch = require('node-fetch');
const OPTIONS = 
{
    username: 'rizzy',
    password: 'password'
}
const TEAM_API = 'http://data.nba.net/prod/v2/2021/teams.json'

const main = async () =>
{
    const cluster = await couchbase.connect('couchbase://localhost', OPTIONS)
    const bucket = cluster.bucket('NBA');

    createScope('east', cluster, bucket.name);
    createScope('west', cluster, bucket.name,);
    
    const response = await fetch(TEAM_API)
    const body = await response.json().catch((err) => console.error(err))
    body.league.standard.forEach(team => {
        createCollection(team.nickname.toLowerCase(), cluster, bucket.name, team.confName.toLowerCase())
    })

    async function createScope(scope, cluster, bucket)
    {
        const query = `CREATE SCOPE ${bucket}.${scope}`;
        const queryResult = await cluster.query(query).catch((err) => {console.log(err)})
        console.log('Scope Creation Successful...');
    }

    async function createCollection(collection, cluster, bucket, scope)
    {
        const query = `CREATE COLLECTION ${bucket}.${scope}.${collection}`;
        const queryResult = await cluster.query(query).catch((err) => {console.log(err)})
        console.log('Collection Creation Successful...');
    }

}

main()