const mongoose = require('mongoose');
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
    let requests = await Request.find().populate('tutor').lean();
    requests = requests.map(request => {
      const requestUserEnrolled = request.students?.some(
        student => String(student) === String(req.user?.id)
      );

      request.userEnrolled = requestUserEnrolled;
      return request;
    });

    return res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao dar fetch nos requests' });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const requests = await Request.findById(req.params.id)
      .populate('tutor')
      .populate('students');

    return res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao dar fetch nos requests' });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    let requests = await Request.find({
      students: mongoose.Types.ObjectId(String(req.user?.id)),
    })
      .populate('tutor')
      .lean();

    requests = requests.map(request => {
      request.userEnrolled = true;
      return request;
    });

    return res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao dar fetch nos requests' });
  }
};

exports.getMyTaughtRequests = async (req, res) => {
  try {
    let requests = await Request.find({
      tutor: mongoose.Types.ObjectId(String(req.user?.id)),
    })
      .populate('students')
      .populate('tutor')
      .lean();

    requests = requests.map(request => {
      request.userEnrolled = false;
      return request;
    });

    return res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao dar fetch nos requests' });
  }
};

exports.updateRequest = async (req, res) => {
  const id = req.params.id;

  let request = await Request.findById(id)
    .populate('tutor')
    .populate('students');

  if (!request) {
    return res
      .status(404)
      .json({ message: `Erro ao atualizar request com id ${id}` });
  }

  if (String(request.tutor._id) !== String(req.user.id)) {
    return res
      .status(400)
      .json({ message: `Erro ao atualizar request com id ${id}` });
  }

  request = await Request.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('tutor')
    .populate('students');

  return res.json(request);
};

exports.deleteRequest = async (req, res) => {
  const id = req.params.id;

  const request = await Request.findById(id);

  if (!request) {
    return res.status(404).json({
      message:
        'N??o foi poss??vel deletar request com esse id. Talvez esse request n??o exista!',
    });
  }

  if (String(request.tutor) !== String(req.user.id)) {
    return res
      .status(400)
      .json({ message: `Erro ao deletar request com id ${id}` });
  }

  await request.remove();

  return res.json({ message: 'Seu request foi deletado com sucesso!' });
};

exports.subscribeToClass = async (req, res) => {
  const id = req.params.id;

  let request = await Request.findById(id);

  if (!request) {
    return res
      .status(404)
      .json({ message: `Erro ao atualizar request com id ${id}` });
  }

  const studentAlreadyEnrolled = request.students?.some(
    student => String(student) === String(req.user.id)
  );

  if (studentAlreadyEnrolled) {
    return res
      .status(400)
      .json({ message: 'Usu??rio j?? est?? cadastrado nesta classe' });
  }

  if (String(request.tutor) === String(req.user.id)) {
    return res
      .status(400)
      .json({ message: 'Tutor n??o pode se cadastrar na pr??pria classe' });
  }

  request = await Request.findByIdAndUpdate(
    id,
    {
      $addToSet: { students: req.user },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.json(request);
};

exports.unsubscribeFromClass = async (req, res) => {
  const id = req.params.id;

  let request = await Request.findById(id);

  if (!request) {
    return res
      .status(404)
      .json({ message: `Erro ao atualizar request com id ${id}` });
  }

  const studentAlreadyEnrolled = request.students?.some(
    student => String(student) === String(req.user.id)
  );

  if (!studentAlreadyEnrolled) {
    return res
      .status(400)
      .json({ message: 'Usu??rio n??o est?? cadastrado nessa classe' });
  }

  try {
    request = await Request.findByIdAndUpdate(
      id,
      {
        $pull: { students: req.user._id },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.json(request);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Falha ao remover usu??rio da aula' });
  }
};
