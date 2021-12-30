const { Team } = require('./Team');
const fetch = require('node-fetch');

let teams;

const main  = async () => {

    let response = await fetch('http://data.nba.net/prod/v2/2021/teams.json')
    return await response.json()

}

main().then((json) => {
    console.log(json.league.standard)
}).catch((err) => console.error(err));
