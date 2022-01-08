const couchbase = require('couchbase')
const fetch = require('node-fetch');
const OPTIONS = 
{
    username: 'rizzy',
    password: 'password'
}
const TEAM_API = 'http://data.nba.net/prod/v2/2021/teams.json'
const PLAYER_API = 'http://data.nba.net/prod/v1/2021/players.json'

const main = async () =>
{
    const cluster = await couchbase.connect('couchbase://localhost', OPTIONS)
    const bucket = cluster.bucket('NBA');

    let teams = {};

    const response = await fetch(TEAM_API)
    const body = await response.json().catch((err) => console.error(err))
    body.league.standard.forEach(team => 
    {
        teams[team.Id] = team.nickname.toLowerCase()
        createCollection(team.nickname.toLowerCase(), cluster, bucket.name, team.confName.toLowerCase())
    })


    _fetchPlayers(PLAYER_API)

    async function _fetchPlayers(url)
    {
        const res = await fetch(url);
        const body = await res.json().catch((err) => console.error(err))
        body.league.standard.forEach(player => {
            let playerTeam = findTeamByID(player.teamId);
            let playerDocument = {
                "firstName": player.firstName,
                "lastName": player.lastName,
                "personID": player.personId,
                "jersey": player.jersey,
                "position": player.pos,
                "height": player.heightFeet + "'" + player.heightInches,
                "dateOfBirth": player.dateOfBirthUTC
            }
            insertIntoCollection(playerTeam, playerDocument, player.personId)
        })
    }

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

    async function insertIntoCollection(collection, document, playerID)
    {
        let myCollection = bucket.collection(collection)
        const key = `player_${playerID}`
        const result = await myCollection.insert(key, document).catch((err) => {console.error(err)});
        console.log('Insert Into Collection Successful...');
    }

    function findTeamByID(id)
    {
        return teams[id]
    }

}

main()