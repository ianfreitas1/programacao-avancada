const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  const { tutor, subject, description } = req.body;

  try {
    const request = await Request.create({ tutor, subject, description });

    return res.json({ request });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar request' });
  }
};
