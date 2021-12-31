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
        this.bucket = '';
        this.collection = '';
        this.nameOfBucket = nameOfBucket;
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
    {   // TODO: I suspect this function needs proper async handling
        // to ensure ( THIS.BUCKET ) is set to the correct value ...
        // thus guaranteeing we have a valid ( THIS.COLLECTION ) set
        // for #createCollection and #insertIntoCollection
        couchbase.connect('couchbase://localhost', OPTIONS)
        .then((cluster) => this.#getNameFrom(cluster));
    }

    #getNameFrom(cluster)
    {
        this.bucket = cluster.bucket(this.nameOfBucket); // may fail
        this.#createCollection();
    }

    #createCollection()
    {
        // TODO: As currently built, we operate as though we know exacly that nameOfBucket provided
        // when creating a new Database object, is the same as available buckets in Database
        // In future iterations we must error handle to ensure a name provided === available buckets

        this.collection = this.bucket.collection()
    }
}

export { Database }