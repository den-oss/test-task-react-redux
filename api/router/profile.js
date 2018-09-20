const express = require('express');
const {ProfileModel, ProfileSchemaFields} = require('../db/models/profile');

const profileRouter = express.Router();

profileRouter.get('/', async (req, res, next) => {
    try {
        const profile = await ProfileModel.findOne({});
        return res.send({success: true, data: profile});
    } catch (error) {
        return next(error);
    }
});

profileRouter.put('/', async (req, res, next) => {
    try {
        let newProfile = req.body.profile;
        if (!newProfile)
            throw new Error("No profile in body");

        let profile = await ProfileModel.findOne({});
        if (!profile) {
            profile = new ProfileModel(newProfile);
        }
        for (let k in ProfileSchemaFields) {
            profile.set(k, newProfile[k]);
        }
        profile = await profile.save();

        return res.send({success: true, data: newProfile});
    } catch (error) {
        return next(error);
    }
});

module.exports = profileRouter;
