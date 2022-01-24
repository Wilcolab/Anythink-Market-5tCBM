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

function populateDb() {
    User.findOne({ role: 'user' })
        .then(function(user) {
            if (!user) {
                console.log('User not found');
            }

            console.log('Populating data');
            itemsToPopulate.map( item => {
                var newItem = new Item(item);
                newItem.seller = user;
                newItem.save();
            });
            console.log('Done populating data');
        });
}

mongoose.connect(process.env.MONGODB_URI);
populateDb();