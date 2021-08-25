const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { name, email, password, age, major } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    user = await User.create({ name, email, password, age, major });

    const token = user.getSignedJwtToken();

    return res.json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = user.getSignedJwtToken();

    user = user.toObject();
    delete user.password;

    return res.json({ token, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
