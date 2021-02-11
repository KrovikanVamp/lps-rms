const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:purpledragons@cluster0.yk9m7.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("rms").collection("people");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})