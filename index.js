const player = {
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

const couchbase = require('couchbase');

async function main() {
    const cluster = await couchbase.connect('couchbase://localhost', {
        username: 'Administrator',
        password: 'password'
    })

    const bucket = cluster.bucket('player-data');
    const raptors = bucket.scope('rosters').collection('raptors');

    upsertPrecious001(player, raptors);

}

const upsertPrecious001 = async (doc, collection) => {
    try {
        const key = 'player_001';
        const result = await collection.upsert(key, doc)
        console.log('Result from Upsertion: ');
        console.log(result)
    } catch(error) {
        console.error(error);
    }
}



main().catch((err) => {
    console.log('Error -- ', err)
    process.exit()
}).then(process.exit);



