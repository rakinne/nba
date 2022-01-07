import couchbase from 'couchbase';

const OPTIONS = {
    username: 'rizzy',
    password: 'password'
}

const UPSERTING_MSG = 'Inserting Document...'
const FAIL_UPSERT_MSG = 'FAILED To Upsert'

class Database
{
    constructor(nameOfBucket)
    {
        this.cluster;
        this.bucket = nameOfBucket;
        this.collection;
        this.hardCodedName = 'NBA'
    
        this.connectServer();
    }

    insertMultipleDocuments(documents)
    {

    }

    insertDocument(document)
    {
        // this.#insertIntoCollection(document);
        try 
        {
            this.#insertIntoCollection(document)
        } catch (error) { console.log(FAIL_UPSERT_MSG, error) }
    }

    async #insertIntoCollection(document)
    {
        try {
            const key = String(document.personId);
            const result = await this.collection.insert(key, document);
            console.log(UPSERTING_MSG, result)
        } catch (error) { console.log(FAIL_UPSERT_MSG, error) }
    }

    alterScope(scopeName)
    {
        return this.bucket.scope(scopeName);
    }

    async connectServer() 
    {   // (fixme): I suspect this function needs proper async handling
        // to ensure ( THIS.BUCKET ) is set to the correct value ...
        // thus guaranteeing we have a valid ( THIS.COLLECTION ) set
        // for #createCollection and #insertIntoCollection
        try {
            this.cluster = await couchbase.connect('couchbase://localhost', OPTIONS)
            console.log('Server Connected!')
            console.log('Passing Cluster Name Now...')
            this.#setBucketCluster()
        } catch (err) {
            console.error(err);
        }
    }

    #setBucketCluster()
    {
        try {
            this.bucket = this.cluster.bucket(this.bucket); // may fail
            console.log('Bucket from createBucketUsing: ', this.bucket)
        } catch (err) {
            console.log(err)
        }
    }

    async createCollection(scope, collectionName)
    {
        const query = `CREATE COLLECTION ${this.bucket}.${scope}.${collectionName}`
        let queryResult = await this.cluster.query(query);
        console.log(queryResult);
    }
}

export { Database }