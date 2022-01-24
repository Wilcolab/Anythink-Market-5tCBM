require("dotenv").config();
var mongoose = require('mongoose');
require('./models/User');
require('./models/Item');
var Item = mongoose.model('Item');
var User = mongoose.model('User');

const itemsToPopulate = [
    { title: 'Item 1', description: 'This is item1 description'},
    { title: 'Item 2', description: 'This is item2 description'},
    { title: 'Item 3', description: 'This is item3 description'},
    { title: 'Item 4', description: 'This is item4 description'},
];

async function populateDb() {
            console.log('Populating data');

            const user = new User({ username: 'test', email: 'test@wilcohq.com' });
            await user.save();

            for (const item of itemsToPopulate){
                var newItem = new Item(item);
                newItem.seller = user;
                await newItem.save()
            }
            console.log('Done populating data');
}

mongoose.connect(process.env.MONGODB_URI);
populateDb().then(()=> {
    console.log('Done');
    process.exit();
});