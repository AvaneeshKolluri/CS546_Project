const privateRoutes = require('./private');
const publicRoutes = require('./public.js');
const apiRoutes = require('./api');
const mainRoutes = require('./main');

const constructorMethod = (app) => {
  app.use('/', mainRoutes);
  app.use('/private', privateRoutes);
  app.use('/public', publicRoutes);
  app.use('/api', apiRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404); // Add some page here
  });
};

module.exports = constructorMethod;