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

exports.getAllRequests = (req, res) => {  
  Request.find().then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(500).send({
      message: "Erro ao dar fetch nos requests."
    });
  });
}

exports.getRequest = (req, res) => {  
  const id = req.params.id;
  
  Request.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ 
        message: "Não foi possível encontrar request com esse" + id 
      })
      return
    }
    res.send(data);
  })
  .catch(error => {
    res.status(500).send({
      message: "Erro ao dar fetch no request com esse" + id
    });
  });
}

exports.updateRequest = (req, res) => {  
  const id = req.params.id;
  
  Request.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(res.send({ message: "Seu request foi atualizado com sucesso!"}))
    .catch(error => {
      res.status(500).send({
        message: "Erro ao tentar atualizar o request com esse" + id
      });
    });
}

exports.deleteRequest = (req, res) => {  
  const id = req.params.id;
  
  Request.findByIdAndRemove(id).then(data => {
    if (!data) {
      res.status(404).send({ 
        message: "Não foi possível deletar request com esse id. Talvez esse request não exista!"
      })
      return
    }
    res.send({ message: "Seu request foi deletado com sucesso!"});
  })
  .catch(error => {
    res.status(500).send({
      message: "Erro ao tentar deletar request com esse" + id
    });
  });
}