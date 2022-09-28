let express= require('express');
let app= express();
const exphbs=require('express-handlebars');
const flash= require('express-flash');
const session=require('express-session');
const bodyParser = require('body-parser');
const pgp= require('pg-promise')({});
// const daily = require('./daily');
const DailyExpense= require('./daily')
app.use(express.static('public'));

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://kay:kv990@localhost:5432/tracker";

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(session({
   secret: 'this is my longest string that is used to test my daily expenses with db app for browser',
   resave: false,
   saveUninitialized: true
}));

app.use(flash());

const config = {
    connectionString: DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
    config.ssl = {
        rejectUnauthorized: false
    }
}
const db = pgp(config);
const dailyExpenses = DailyExpense(db);


app.get('/', function(req, res){

    res.render('index', )
})

app.post('/add', async function(req, res){
    const name= req.body.fname;
    const sname= req.body.sname;
    const email= req.body.email;
    await dailyExpenses.setNames(name, sname, email);

    req.flash('sucess', "Thank you for submission")
    res.redirect("expenses")
})


app.post('/expenses/:name', async function(req, res){
    const expens= req.body.catagory
    const amount= req.body.amount
    const expense_date= req.body.expense_date
    const name = req.params.name
    await dailyExpenses.setExpense(expens, amount, expense_date)
    
    
    console.log( expense_date + "dsdsdsdsd")
    res.render('categories',{name})
})

app.get('/expenses', async function(req, res){

    const category_des= req.body.catagory
    const amount= req.body.amount
    const expense_date= req.body.expense_date
    const name = req.params.name
    // await dailyExpenses.setExpense(expens, amount, expense_date)
    // await dailyExpenses.getExpense(amount, expense_date, category_des)
    req.flash("sucess", "Thank you for submission");
    res.render('categories')
})


let PORT = process.env.PORT || 3500
app.listen(PORT, function(){
    console.log('App starting on port', PORT);
})