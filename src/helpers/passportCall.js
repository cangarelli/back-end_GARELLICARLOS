const passport = require ("passport")

exports.passportCall = strategy => {
    return async (req, res, next) => {
        console.log ("passport Call")
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next (err)
            if (!user) return res.status(401).send({error: info.message ? info.message : info.toString()})
            req.user = user
            next()
        }) (req, res, next)
    }
}