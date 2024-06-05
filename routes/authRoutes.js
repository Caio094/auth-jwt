const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require ('../middleware/authMiddleware')

// Rota de registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (user) {
    const token = jwt.sign({ userId: user.id }, 'secret_key');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválida' });
  }
});

/*router.post('/users',async (req, res) => {
   const {name, email} = req.body;
    const user = await User.findAll({name, email});
   if (user){
        const token =''   }
})*/

router.post('/users', verifyToken, async (req, res) => {
    try {
    
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;
