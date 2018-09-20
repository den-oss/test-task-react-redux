const mongoose = require('mongoose');
const mongodbConnectString = process.env.MONGODB_CONNECT || 'mongodb://localhost:27018/demoDB';
console.log("Mongodb connect: " + mongodbConnectString);

mongoose.connect(mongodbConnectString, {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

module.exports = {mongoose};
