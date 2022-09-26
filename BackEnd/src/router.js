const controller = require('./controller');
const { findOne, findAll, findById } = require('./middleware/find');

const routers = (router) => {
  router.post('/question', controller.create);
  router.delete('/question', controller.remove);
  router.get('/questions', controller.read);
  router.get('*', (req, res) => res.sendStatus(404));
};

module.exports = routers;
