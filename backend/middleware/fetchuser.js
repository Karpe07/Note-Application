import jwt from 'jsonwebtoken';


// const jwt = require('jsonwebtoken');
const JWT_SECRETE = "YourJWT_SECREATE"


const fetchuser = (req, res, next) =>{
    const token = req.header("auth-token")
    if(!token){
        return res.status(401).send({error : "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token , JWT_SECRETE );
        req.user = data.user
        next();
        
    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
}

// module.exports = fetchuser;
export default fetchuser
