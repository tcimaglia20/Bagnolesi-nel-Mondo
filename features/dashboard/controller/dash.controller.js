const User = require('../../../models/User');

const userDashboard = (req, res) => {
    try {
        const loggedInUser = req.session.user;

        const currentHour = new Date().getHours();
        let greeting = "Welcome";
        if (currentHour < 12) greeting = "Good morning";
        else if (currentHour < 18) greeting = "Good afternoon";
        else greeting = "Good evening";

        res.render('dashboard', {
            title: "Your Dashboard",
            user: loggedInUser,
            greeting: greeting,
            serverTime: new Date().toLocaleTimeString(),
        })
    } catch (error) {
        res.status(500).send("Error loading dashboard content")
    }

};

const adminDashboard = (req, res) => {
    try {
        res.render('admin', {
            title: 'Admin Panel',
            user: req.session.user,
        });
    } catch (error) {
        res.status(500).send("Error loading admin dashboard");
    }
};

module.exports = {
    userDashboard,
    adminDashboard
}