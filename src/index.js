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

    createScope('east', cluster, bucket.name);
    createScope('west', cluster, bucket.name);

    let teamsByID = {};
    let teamsByConference = {};

    const response = await fetch(TEAM_API)
    const body = await response.json().catch((err) => console.error(err))
    body.league.standard.forEach(team => 
    {
        if (team.isNBAFranchise === false) { return }
        if (team.nickname.includes(" ")) { team.nickname.replace(/\s/g, "")}
        if (team.nickname === '76ers') { team.nickname = team.urlName }
        teamsByID[team.teamId] = team.nickname.toLowerCase()
        teamsByConference[team.teamId] = team.confName.toLowerCase();
        
        createCollection(team.nickname.toLowerCase(), cluster, bucket.name, team.confName.toLowerCase())
    })

    _fetchPlayers(PLAYER_API)

    async function _fetchPlayers(url)
    {
        const res = await fetch(url);
        const body = await res.json().catch((err) => console.error(err))
        body.league.standard.forEach(player => {
            if (player.isActive === false) { return } // if not active player, continue. Using return inside of forEach equivalent functionality to continue
            
            let playerTeam = findTeamById(player.teamId);
            let playerTeamConferenceForScope = findTeamConf(player.teamId)
            let playerDocument = {
                "firstName": player.firstName,
                "lastName": player.lastName,
                "personID": player.personId,
                "teamID": player.teamId,
                "jersey": player.jersey,
                "position": player.pos,
                "height": player.heightFeet + "'" + player.heightInches,
                "dateOfBirth": player.dateOfBirthUTC
            }

            insertIntoCollection(playerTeam, playerDocument, player.personId, playerTeamConferenceForScope)
        })
    }

    async function createScope(scope, cluster, bucket)
    {
        const query = `CREATE SCOPE ${bucket}.${scope}`;
        const queryResult = await cluster.query(query).catch((err) => {console.log(err.context)})
    }

    async function createCollection(collection, cluster, bucket, scope)
    {
        const query = `CREATE COLLECTION ${bucket}.${scope}.${collection}`;
        const queryResult = await cluster.query(query).catch((err) => {console.log(err.context)})
    }

    async function insertIntoCollection(collection, document, playerID, scope)
    {
        const configuredScope = bucket.scope(scope);
        const myCollection = configuredScope.collection(collection);
        const key = `player_${playerID}`
        const result = await myCollection.insert(key, document).catch((err) => {console.error(err.context)}).finally('Insert Successful');
    }

    function findTeamById(id)
    {
        return teamsByID[id]
    }

    function findTeamConf(id)
    {
        return teamsByConference[id];
    }

}

main()