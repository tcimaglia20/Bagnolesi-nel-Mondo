require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db')

const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'features/piazza/views'),
    path.join(__dirname, 'features/heritage/views')
]);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Bagnolesi nel Mondo' })
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.use((req, res, next) => {
    const urlRole = req.query.role || 'user';
    req.user = {
        _id: "65a7bc2e1a3b4c5d6e7f8g9h",
        username: "John",
        role: urlRole
    };
    next();
})

app.use('/piazza', require('./features/piazza/piazza.routes'));
app.use('/heritage', require('./features/heritage/heritage.routes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});