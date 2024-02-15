const authorizationJWT = (role) =>{
    return async (req, res, next) =>{
        console.log ("authorizationJWT")
        if (!req.user) return res.status(401).send({error: "Unauthorized"})
        if (req.user.role != role) return res.status(401).send({error: "Not permission"})
        next()
    }
}

module.exports = authorizationJWT