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
        username: '',
        email: '',
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
                error: 'Password must be at least 8 characters long and include a letter, number, and special character.',
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

module.exports = {
    getLoginData,
    getRegisterData,
    register,
}