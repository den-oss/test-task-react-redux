const {mongoose} = require('../connect');

const ProfileSchemaFields = {
    firstName: { type: String } ,
    lastName: { type: String } ,
    company: { type: String } ,
    department: { type: String } ,
    position: { type: String } ,
    email: { type: String } ,
};

const ProfileSchema = mongoose.Schema(ProfileSchemaFields);
const ProfileModel = mongoose.model( 'profile', ProfileSchema );

module.exports = {ProfileModel, ProfileSchemaFields};
