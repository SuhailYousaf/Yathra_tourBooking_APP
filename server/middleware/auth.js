const jwt = require('jsonwebtoken');
const secret = 'sakdfnsadklfnasdgsdfgsdgfg'; // Replace with your actual secret

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("Received Token:", token); // Log the received token
        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);
            console.log("Decoded Data:", decodedData); // Log the decoded data
            req.adminId = decodedData?.id;
            console.log(" req.agentId "+  req.adminId )
        } else {
            throw new Error('Custom authorization token invalid');
        }

        next();
    } catch (error) {
        console.log('Authentication error:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;
