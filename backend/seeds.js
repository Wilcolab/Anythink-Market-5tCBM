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

async function populateItemsTable() {
    console.log('Populating Items');

    const user = new User({ username: 'test', email: 'test@wilcohq.com' });
    await user.save();

    for (const item of itemsToPopulate) {
        var newItem = new Item(item);
        newItem.seller = user;
        await newItem.save()
    }
}

async function populateUsersTable() {
    const usersCount = 105;
    console.log('Populating users');

    for (var i=1; i<usersCount; i++){
        const user = new User({ username: `TestUser${i}`, email: `TestUser${i}@wilcohq.com` });
        await user.save();
    }
}

mongoose.connect(process.env.MONGODB_URI);
populateItemsTable().then(()=> {
    console.log('Done populating Items');
});

populateUsersTable().then(()=> {
    console.log('Done populating users');
    process.exit();
});