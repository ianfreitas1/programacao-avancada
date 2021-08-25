const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  const { subject, description } = req.body;

  try {
    const request = await Request.create({
      tutor: req.user,
      subject,
      description,
    });

    return res.json({ request });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar request' });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('tutor');
    return res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao dar fetch nos requests' });
  }
};

exports.getRequest = (req, res) => {
  const id = req.params.id;

  Request.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: 'Não foi possível encontrar request com esse' + id,
        });
        return;
      }
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Erro ao dar fetch no request com esse' + id,
      });
    });
};

exports.updateRequest = async (req, res) => {
  const id = req.params.id;

  let request = await Request.findById(id);

  if (!request) {
    return res
      .status(404)
      .json({ message: `Erro ao atualizar request com id ${id}` });
  }

  if (request.tutor !== req.user) {
    return res
      .status(400)
      .json({ message: `Erro ao atualizar request com id ${id}` });
  }

  request = await Request.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.json(request);
};

exports.deleteRequest = async (req, res) => {
  const id = req.params.id;

  const request = await Request.findById(id);

  if (!request) {
    return res.status(404).json({
      message:
        'Não foi possível deletar request com esse id. Talvez esse request não exista!',
    });
  }

  if (request.tutor !== req.user) {
    return res
      .status(400)
      .json({ message: `Erro ao deletar request com id ${id}` });
  }

  await request.remove();

  return res.json({ message: 'Seu request foi deletado com sucesso!' });
};
