const {MongoClient} = require('mongodb');
require('dotenv/config');

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('Journal');
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a doc into collection', async () => {
        const entries = db.collection('Entries');
        const mockEntry = {_id: '62b66cef20fba432c016e910', title: 'Test Title', entry: 'Test Entry'};
        await entries.insertOne(mockEntry);
        const insertedEntry = await entries.findOne({_id: '62b66cef20fba432c016e910'});
        expect(insertedEntry).toEqual(mockEntry);
    });
});