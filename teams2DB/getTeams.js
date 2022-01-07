import { Team } from './Team.js';
import fetch from 'node-fetch';

class Conference 
{
    constructor() 
    {
        this.teams = [];
    }

    getTeams() 
    {
        return this.teams;
    }

    addTeam(team)
    {
        this.teams.push(team)
    }
}


class East extends Conference 
{
    constructor() 
    {
        super();
    }
}

class West extends Conference 
{
    constructor() 
    {
        super();
    }
}

class NBA 
{
    api = 'http://data.nba.net/prod/v2/2021/teams.json';

    constructor() 
    {
        this.east;
        this.west;
        this.resolveAllTeams();
    }

    resolveAllTeams() 
    {

        console.log('Now Beginning Resolution: Resolving All Teams')
    
        this._fetch(this.api).then((json) => 
        {
            const standardLeagueTeams = json.league.standard;
            let TEAMS = [];
            standardLeagueTeams.forEach(team => 
            {
                TEAMS.push(new Team(team.fullName, team.teamId, team.nickname, team.confName))
            });
            this.separateTeamsByConference(TEAMS);
    
        }).catch((err) => console.error(err)).finally(() => { console.log('Completed Fetch...') });
    }

    _fetch = async (url) =>
    {
        const response = await fetch(url)
        return await response.json()
    }

    separateTeamsByConference(teams)
    {
        console.log('Beginning Separation of Teams By Conference...')
        const east = new East();
        const west = new West();
        
        teams.forEach(team => 
        {
            if (team.conference.toLowerCase() === 'east')
            {
                east.addTeam(team);
            } else 
            {
                west.addTeam(team);
            }
        })

        this.east = east;
        this.west = west
    }

    getEastConference() 
    {
        return this.east.getTeams();
    }

    getWestConference() 
    {
        return this.west.getTeams();
    }
}

// export let easternConference = easternConferenceTeams
// export let westernConference = westernConferenceTeams
export { NBA }
// getAllTeams();