const User = require('../../../models/User');

const getLoginData = (req, res) => {
    return {
        title: "Login"
    }
};

const getRegisterData = (req, res) => {
    return {
        title: "Register"
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('../views/regsiter', { error: 'Email already regsitered' })
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.redirect('/auth/login');
    } catch (error) {
        res.render('../views/register', { error: 'An error occurred during registration. Please try again.' })
    }
};

const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.render('../views/login', { error: 'Invalid email or password' })
        }

        res.redirect('/dashboard');
    } catch (error) {
        res.render('../views/login', { error: 'An error occurred during login. Please try again.' })
    }
}

module.exports = {
    getLoginData,
    getRegisterData,
    register,
    login
}