import { Team } from './Team.js';
import fetch from 'node-fetch';

const main = (teams) => 
{
    console.log(teams);
}

function resolveAllTeams() {

    _fetch('http://data.nba.net/prod/v2/2021/teams.json').then((json) => 
    {
        const standardLeagueTeams = json.league.standard;
        let TEAMS = [];

        standardLeagueTeams.forEach(team => 
        {
            TEAMS.push(new Team(team.fullName, team.teamId, team.nickname, team.confName))
        });

        populateLeagueWith(TEAMS);

    }).catch((err) => console.error(err));
}

function populateLeagueWith(teams) 
{   // This function will be the starting point to populating my array
    main(teams);
}

async function _fetch(url) 
{

    const response = await fetch(url)
    return await response.json()

}

resolveAllTeams();
// getAllTeams();
