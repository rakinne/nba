import { Database } from './db/Database.js'

function main() 
{
    const db = new Database('NBA');
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

    db.connectServer();
    db.insertDocument(playerDocument)
}

// main().catch((err) => {
//     console.log('Error -- ', err)
//     process.exit()
// }).then(process.exit);

main()

 
// TODO:
// last time ran project, got this output : 'FAILED To Upsert TypeError: Cannot read property 'insert' of undefined'
// i'm almost positive i know where the bug is (see Database)
