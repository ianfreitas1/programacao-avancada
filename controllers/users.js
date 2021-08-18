const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { name, email, password, age, major } = req.body;

  try {
    const user = await User.create({ name, email, password, age, major });

    const token = user.getSignedJwtToken();

    return res.json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};
