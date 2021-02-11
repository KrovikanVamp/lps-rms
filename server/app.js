var express = require('express');
var app = express();
var port = 3000;
var {MongoClient} = require('mongodb');
async function run(input) {
	const uri = 'mongodb+srv://admin:purpledragons@cluster0.yk9m7.mongodb.net/people?retryWrites=true&w=majority';
	const client = new MongoClient(uri, {useUnifiedTopology: true});
	await client.connect();

	const dbName = 'people';
	const collectionName = 'people_test_00';
	const database = client.db(dbName);
	const collection = database.collection(collectionName);

	const order_info = input;
	try {
		await collection.insertOne(order_info);
		console.log(`Added ${JSON.stringify(order_info)} successfully!`);
	} catch (err) {
		console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
	}
	// Make sure to call close() on your client to perform cleanup operations
	await client.close();
}

app.get('/', function(req, res) {
	res.send('Hello World!');
});
app.listen(port, function() {
	console.log('Example app listening at http://localhost:' + port);
});
run({message: 'hello? does this work??'});
