let express= require('express');
let app= express();
const exphbs=require('express-handlebars');
const flash= require('express-flash');
const session=require('express-session');
const bodyParser = require('body-parser');
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){

    res.render('index')
})

app.post('/add', function(req, res){

    res.render('expenses')
})

app.get('/expenses', function(req, res){

    res.render('categories')
})

app.post('/expenses', function(req, res){

    res.redirect('expenses')
})

let PORT = process.env.PORT || 3300
app.listen(PORT, function(){
    console.log('App starting on port', PORT);
})