require("dotenv").config();
var mongoose = require('mongoose');
require('./models/User');
require('./models/Item');
var Item = mongoose.model('Item');
var User = mongoose.model('User');

async function populateItemsTable() {
    const itemssCount = 105;
    console.log('Populating Items');

    const user = new User({ username: 'test', email: 'test@wilcohq.com' });
    await user.save();

    for (var i=1; i<itemssCount; i++) {
        var newItem = new Item({ title: `Item ${i}`, description: `This is item ${i} description` });
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