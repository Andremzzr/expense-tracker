import jsonwebtoken from 'jsonwebtoken';

async function jwtAuth(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
        console.error(error)
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
}

module.exports = { jwtAuth }