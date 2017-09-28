const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const shoeRoutes = require('./shoes_api');
const Models = require('./models');
const ObjectId = require("mongodb").ObjectId;
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/shoesApi');
const ShoeRoutes = shoeRoutes(models);
const app = express();

app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
        next();
})

app.engine('.handlebars', exphbs({
        defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
        extended: false
}))
app.use(bodyParser.json())

app.use(express.static('public'));

app.use(session({
        secret: 'keyboard cat',
        cookie: {
                maxAge: 60000 * 30
        }
}));
app.use(flash());

app.get('/', function(req, res) {
        res.redirect('/api/shoes');
})

// app.get('/api/shoes', ShoeRoutes.shoes);
app.get('/api/shoes', ShoeRoutes.AllShoes);
app.get('/api/shoes/brand/:brandname', ShoeRoutes.showBrands);
app.get('/api/shoes/size/:size', ShoeRoutes.showSizes);
app.get('/api/shoes/color/:color', ShoeRoutes.showColors);
app.get('/api/shoes/brand/:brandname/size/:size', ShoeRoutes.showBrandSize);
app.post('/api/shoes/sold/:id', ShoeRoutes.updatingStock);
app.post('/api/shoes', ShoeRoutes.addNewShoes);

const port = process.env.PORT || 3018;
app.listen(port, function() {
        console.log('web app started on port: ' + port);
})
