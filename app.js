const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // read request body from a form

//Changed default layout to false b/c main was showing twice
app.engine('handlebars', exphbs({ defaultLayout: false }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log('Routes are running on http://localhost:3000');
});
