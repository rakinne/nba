import { Database } from './db/Database.js'
// import { easternConference as eastern, westernConference as western } from './teams2DB/getTeams.js'
import { NBA } from './teams2DB/getTeams.js'
// const e = eastern;
// const w = western;

const nba = new NBA();



function main() 
{
  // const db = new Database('NBA');
  const playerDocument = {
      "firstName": "Precious",
      "lastName": "Achiuwa",
      "temporaryDisplayName": "Achiuwa, Precious",
      "personId": "1630173",
      "teamId": "1610612761",
      "jersey": "5",
      "isActive": true,
      "pos": "F",
      "heightFeet": "6",
      "heightInches": "8",
      "heightMeters": "2.03",
      "weightPounds": "225",
      "weightKilograms": "102.1",
      "dateOfBirthUTC": "1999-09-19",
      "teamSitesOnly": {
        "playerCode": "precious_achiuwa",
        "posFull": "Forward",
        "displayAffiliation": "Memphis/Nigeria",
        "freeAgentCode": ""
      }
  }

//   // db.insertDocument(playerDocument)
// }

// main().catch((err) => {
//     console.log('Error -- ', err)
//     process.exit()
// }).then(process.exit);
// resolveAllTeams()
// console.log(e);
// console.log(w)