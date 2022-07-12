const {MongoClient} = require('mongodb');
require('dotenv/config');
const {ObjectId} = require('mongodb');

describe('server', () => {
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

    it('should insert a doc into Entries collection', async () => {
        const entries = db.collection('Entries');
        const id = new ObjectId();
        const mockEntry = {_id: id, title: 'Test Title', entry: 'Test Entry'};
        await entries.insertOne(mockEntry);
        const insertedEntry = await entries.findOne({_id: id});
        expect(insertedEntry).toEqual(mockEntry);
    });

    it('should insert a doc into Profile collection', async () => {
        const profile = db.collection('Profile');
        const id = new ObjectId();
        const mockProfile = {_id: id, profileName: 'Test Name', mood: 'Test', interests: 'Test interests', introduction: 'Hi. I am a test.', profileImageUrl: 'https://lh3.googleusercontent.com/a/AATXAJwccRK4PnVWIBXbbwwbjPrEipUl8VWUoRh8fiXn=s96-c'};
        await profile.insertOne(mockProfile);
        const insertedProfile = await profile.findOne({_id: id});
        expect(insertedProfile).toEqual(mockProfile);
    });

    it('should insert a doc into Themes collection', async () => {
        const themes = db.collection('Themes');
        const id = new ObjectId();
        const mockTheme = {_id: id, title: 'Test Title', createdUsername: 'Test', mainColor: 'Test', secondaryColor: 'Test', backgroundImage: 'https://lh3.googleusercontent.com/a/AATXAJwccRK4PnVWIBXbbwwbjPrEipUl8VWUoRh8fiXn=s96-c', searchTags: 'Test, test', description: 'This is a test.'};
        await themes.insertOne(mockTheme);
        const insertedTheme = await themes.findOne({_id: id});
        expect(insertedTheme).toEqual(mockTheme);
    });

    it('should insert a doc into Users collection', async () => {
        function makeid() {
            let text = "";
            const possible = "0123456789";
            for (let i = 0; i < 20; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
        function makeDisplayName() {
            let text = "";
            const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
            for (let i = 0; i < 10; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
        const newGoogleId = makeid();
        const newDisplayName = makeDisplayName();
        const users = db.collection('Users');
        const id = new ObjectId();
        const mockUser = {_id: id, googleId: newGoogleId, displayName: newDisplayName, firstName: 'Te', lastName: 'St', image: 'https://lh3.googleusercontent.com/a/AATXAJwccRK4PnVWIBXbbwwbjPrEipUl8VWUoRh8fiXn=s96-c'};
        await users.insertOne(mockUser);
        const insertedUser = await users.findOne({_id: id});
        expect(insertedUser).toEqual(mockUser);
    });
});
