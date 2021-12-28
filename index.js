const couchbase = require('couchbase');

async function main() {
    const cluster = await couchbase.connect('couchbase://localhost', {
        username: 'Administrator',
        password: 'password'
    })
}

main().catch((err) => {
    console.log('Error -- ', err)
    process.exit()
}).then(process.exit);