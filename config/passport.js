const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email'},
        async (email, password, done) => {
            try {
                // 1. Look for user in MongoDB
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: 'Account does not exist' });
                }

                // 2. Match hashed password
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user); // Success! Passes user to serializeUser
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            } catch (err) {
                return done(err);
            }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return done(null, false);
            }
            
            done(null, user); // Attaches user object to req.user
        } catch (err) {
            done(err, null);
        }
    });
}