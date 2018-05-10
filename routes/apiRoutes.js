module.exports = (app, db) => {
  app.get('/api/all', (req, res) => {
    db.Item.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  app.post('/api/new', (req, res) => {
    db.Item.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
    }).then((result) => {
      res.json(result);
    });
  });

  app.put('/api/update/:id', (req, res) => {
    db.Item.update({
      name: req.body.name,
      price: req.body.price
    }, {
      where: {
        id: req.params.id
      }
    }).then((result) => {
      res.json(result);
    });
  });

  app.delete('/api/delete/:id', (req, res) => {
    db.Item.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => {
      res.json(result);
    });
  });
}
