'use strict';

const users = require('../models/users');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./authKeys');
const authMiddleware = require('./secureMiddleware');

module.exports = function (app, passport) {


    passport.use('google-token', new GoogleTokenStrategy({
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret
    },
        function (accessToken, refreshToken, profile, done) {
            users.upsertGoogleUser(accessToken, refreshToken, profile, function (err, user) {
                return done(err, user);
            });
        }));

    //TODO Encrypt the password
    var localauthStrategy = new LocalStrategy(
        function (username, password, done) {
            users.findOne(username, password, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
        }
    );
    passport.use('localAuth', localauthStrategy);
};