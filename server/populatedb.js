var {MongoClient} = require('mongodb');
var faker = require('faker');

async function run(input) {
	const uri = 'mongodb+srv://admin:purpledragons@cluster0.yk9m7.mongodb.net/people?retryWrites=true&w=majority';
	const client = new MongoClient(uri, {useUnifiedTopology: true});
	await client.connect();

	const dbName = 'people';
	const collectionName = 'people_test_00';
	const database = client.db(dbName);
	const collection = database.collection(collectionName);

	const person_info = input;
	try {
		await collection.insertOne(person_info);
		console.log(`Added ${JSON.stringify(person_info)} successfully!`);
	} catch (err) {
		console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
	}
	// Make sure to call close() on your client to perform cleanup operations
	await client.close();
}

function fakerTest() {
	// console.log(faker.internet.avatar());
	var Person = {
		name         : faker.name.findName(),
		birthday     : faker.date.past(),
		phone_number : faker.phone.phoneNumberFormat(),
		vehicle      : {
			make  : faker.vehicle.manufacturer(),
			model : faker.vehicle.model(),
			vin   : faker.vehicle.vin()
		},
		address      : {
			street_address : faker.address.streetAddress(),
			city           : faker.address.city(),
			state          : faker.address.stateAbbr(),
			zipcode        : faker.address.zipCode()
		}
	};
	run(Person);
	return true;
}

fakerTest();
