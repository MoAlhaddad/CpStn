// Required
const request = new XMLHttpRequest();
app.use('/', index);
app.use('/api/auth', require('./controllers/AuthController'));
app.use('/api/v1/projects');
app.route('/*').get(function(req, res){
    return res.sendFile(path.join(__dirname, 'views/auth/login.ejs'));
});
fetch("https://directwines.p.rapidapi.com/cart/list", {
	"method": "GET",
	"headers": {
		"authorization": "Basic bW9oYW1hZDI1Ok1hNmNyN3JtZmM=",
		"x-rapidapi-host": "directwines.p.rapidapi.com",
		"x-rapidapi-key": "7e7a56560cmshcd1a3aca6d26ae7p1919e3jsnf545c90fe80e"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
fetch.then(response => response.json());
import express, { urlencoded, static } from 'express';
import ejsLayouts from 'express-ejs-layouts';
import { sequelize } from './models';
import methodOverride from 'method-override';
import moment from 'moment';
import flash from 'connect-flash';
import { initialize, session as _session } from './config/passportConfig';
import session, { Store } from 'express-session';
import helmet from 'helmet';
import { Router } from 'express';
import isLoggedIn from '../middleware/isLoggedIn';
let SequelizeStore = require('connect-session-sequelize')(Store)

// Instance
let app = express()


app.set('view engine', 'ejs')
app.use(urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(static(__dirname + '/static/'))
app.use(methodOverride('_method'))

let sessionStore = new SequelizeStore({
    db: sequelize,
    expiration: 30 * 60 * 1000
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore

}));

//use this line once to store table
sessionStore.sync()

app.use(flash()); //must be after session
app.use(initialize())
app.use(_session())
app.use(helmet())

// Custom middleware: write data to locals for every page
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    res.locals.moment = moment
    next();
})

// middleware that allows us to access the 'moment' library in every EJS view
app.use(function(req, res, next) {
    res.locals.moment = moment
    next()
  })


// Controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/search', require('./controllers/search'))


app.get('/', (req, res) => {
    res.render('index')
})

app.get('*', (req, res) => {
    res.render('404');
})

let port = process.env.PORT
let server = app.listen(port, ()=> {
    console.log('Hear, Here! Listening on Port ', port)
  })
  
  export default server

  app.set('view engine', 'ejs');
  app.set('view engine', 'html');
  app.set('view engine', 'php');


  router.get('/', forwardAuthenticated,
  (req, res) => res.render(index.html)
  );
    
  