const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Nenhum token fornecido' });


  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
