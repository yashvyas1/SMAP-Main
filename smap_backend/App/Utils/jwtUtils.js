import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createjwtToken = (user_id, email) => {
    const payload = { user_id, email }
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_TIME
    })
    const jwtExpiryTimeInMilliseconds = convertJwtExpiryTimeToMilliseconds(process.env.JWT_EXPIRY_TIME)
    return {jwtToken, jwtExpiryTimeInMilliseconds}
}

const convertJwtExpiryTimeToMilliseconds = (jwtExpiryTime) => {
    const match = jwtExpiryTime.match(/^(\d+)([smhdw])$/); 
    if (!match) return null;
  
    const value = parseInt(match[1], 10);
    const unit = match[2];
 
    switch (unit) {
      case 's': return value * 1000; // seconds to milliseconds
      case 'm': return value * 60 * 1000; // minutes to milliseconds
      case 'h': return value * 60 * 60 * 1000; // hours to milliseconds
      case 'd': return value * 24 * 60 * 60 * 1000; // days to milliseconds
      case 'w': return value * 7 * 24 * 60 * 60 * 1000; // weeks to milliseconds
      default: return null;
    }
};

export { createjwtToken }