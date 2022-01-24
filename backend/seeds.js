require("dotenv").config();
var mongoose = require('mongoose');

require('./models/User');
require('./models/Item');
require('./models/Comment');

var Item = mongoose.model('Item');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');

async function populateAllTables(){
    console.log('Start populating DB');
    const count = 105;

    for (var i=1; i<count; i++){
        // 1. Create user
        const user = new User({ username: `TestUser${i}`, email: `TestUser${i}@wilcohq.com` });
        await user.save();

        // 2. Create item
        var item = new Item({ title: `Item ${i}`, description: `This is item ${i} description` });
        item.seller = user;
        await item.save();

        // 3. Create comment
        var comment = new Comment({ body: `This is comment ${i}`, seller: user, item });
        await comment.save();

        // 3.1 connect to comment to item
        item.comments = item.comments.concat([comment]);
        await item.save();
    }
}

mongoose.connect(process.env.MONGODB_URI);
populateAllTables().then(() => {
    console.log('Done populating DB');
    process.exit();
})