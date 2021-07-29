const jwt = require("jsonwebtoken");

exports.verifyToken = async(req, res, next) => {
    const token = req.headers['token']
    await jwt.verify(token, 'asdfghjkl', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                msg: 'invalid token'
            })
        }
        req.decoded = decoded;
        next();
    });
}