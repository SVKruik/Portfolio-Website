function deploymentAuthentication(req, res, next) {
    const password = req.headers.authorization;
    if (!password || password.split(" ")[1] !== process.env.DEPLOYMENT_KEY) return res.sendStatus(401);
    next();
}

module.exports = {
    "deploymentAuthentication": deploymentAuthentication
}