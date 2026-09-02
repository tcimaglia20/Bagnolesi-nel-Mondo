const User = require('../../../models/User');
const bcrypt = require('bcrypt');

const getLoginData = (req, res) => {
    return {
        title: "Login",
        error: null 
    }
};

const getRegisterData = (req, res) => {
    return {
        title: "Register",
        error: null
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!email || !password || !username || !confirmPassword ) {
            return res.render('../views/register', {
                title: 'Regsiter',
                error: 'Please fill out all required fields.',
                username: username || '',
                email: email || ''
            });
        }

        if (password !== confirmPassword) {
            return res.render('../views/register', {
                title: 'Regsiter',
                error: 'Passwords do not match. Please try again.',
                username,
                email
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.render('../views/register', {
                title: "Register",
                error: 'Please enter a valid email address',
                username,
                email
            });
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.render('../views/register', {
                title: "Regsiter",
                error: null,
                username, 
                email
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('../views/register', {
                title: 'Regsiter',
                error: 'Email already regsitered. Log in',
                username,
                email
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error)
        res.render('../views/register', {
            title: 'Register',
            error: 'An error occurred during registration. Please try again.',
            username: req.body.username || '',
            email: req.body.email || '',
        })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('../views/login', {
                title: 'Login',
                error: 'Please fill out all required fields.'
            })
        }

        const user = await User.findOne({ email });

        if (!user ) {
            return res.render('../views/login', {
                title: 'Login',
                error: 'Account does not exist. Please register first.'
            })
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.render('../views/login', {
                title: 'Login',
                error: 'Incorrect password. Please try again.'
            })
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }

        res.redirect('/dashboard');
    } catch (error) {
        res.render('../views/login', {
            title: 'Login',
            error: 'An error occurred during login. Please try again.'
        })
    }
}

module.exports = {
    getLoginData,
    getRegisterData,
    register,
    login
}