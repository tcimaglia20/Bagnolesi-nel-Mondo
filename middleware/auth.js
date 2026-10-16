function requireAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: "Authentication required." });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: "Access denied. Admins only" });
    }
    next()
}

function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'You must be logged in to make a post.'})
}

module.exports = { requireAdmin, requireAuth};