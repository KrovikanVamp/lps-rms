const admin = require('firebase-admin');
const serviceAccount = require('./hello-world-46562-firebase-adminsdk-f9rdb-6d4c22b5de.json');
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const faker = require('faker');

var run = setInterval(main, 100);
function main() {
   var Person = {
      name: faker.name.findName(),
      image: faker.image.transport(),
      birthday: faker.date.past(75),
      phone_number: faker.phone.phoneNumberFormat(),
      email: faker.internet.email(),
      nickname: faker.internet.userName(),
      vehicle: {
         make: faker.vehicle.manufacturer(),
         model: faker.vehicle.model(),
         vin: faker.vehicle.vin()
      },
      address: {
         street_address: faker.address.streetAddress(),
         city: faker.address.city(),
         state: faker.address.stateAbbr(),
         zipcode: faker.address.zipCode()
      }
   };

   db.collection('People').doc(Person.name).set(Person).then(() => {
      console.log(`New quote was added to the database`);
   });
}