const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yourhr",{

}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.error(`Connection error`, e);
});
