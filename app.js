require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db')

const app = express(); 

// --- CONFIGURATION ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'features/home/views'),
    path.join(__dirname, 'features/piazza/views'),
    path.join(__dirname, 'features/heritage/views'),
    path.join(__dirname, 'features/auth/views')
]);

app.use(express.static(path.join(__dirname, 'public')));

// Set up automatic cookie handling for sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}))

// --- ROUTES ---
const homeRoutes = require('./features/home/routes/home.routes');
const authRoutes = require('./features/auth/routes/auth.routes');
const piazzaRoutes = require('./features/piazza/routes/piazza.routes');
const heritageRoutes = require('./features/heritage/routes/heritage.routes');

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/piazza', piazzaRoutes);
app.use('/heritage', heritageRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});