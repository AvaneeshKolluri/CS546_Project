const privateRoutes = require('./private');
const publicRoutes = require('./public.js');
const apiRoutes = require('./api');
const mainRoutes = require('./main');
const createRoutes = require('./create');
const quizRoutes = require('./quiz');


const constructorMethod = (app) => {
    app.use('/', mainRoutes);
    app.use('/userinfo', privateRoutes);
    app.use('/quiz', quizRoutes);
    app.use('/public', publicRoutes);
    app.use('/api', apiRoutes);
    app.use('/create', createRoutes);

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;