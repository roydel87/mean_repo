//call the packages
var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();
// var loginRouter = express.Router();
// var errorRouter = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');
var User = require('./models/users');

var port = process.env.PORT || 5000;


//APP CONFIGURATION
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CORS
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-Width, content-type, Authorization');
  next();
});

app.use(morgan('dev'));
//mongoose.connect('mongodb://localhost/pokemon');
mongoose.connect('mongodb://mongouser:mongouser@ds015750.mlab.com:15750/pokemon_rdh')


//API ROUTES
//Main basic route
app.get('/',function(req, res){
  res.send('Welcome to the real world!');
});

//Express router instance
var apiRouter = express.Router();

//http://localhost:5000/api
apiRouter.get('/',function(req,res){
  res.json({ message: 'Welcome to Zion! (Our mother API)'})
});

//routes users
apiRouter.route('/users')
//create user through POST
//URL: http://localhost:5000/api/users
.post(function(req,res){
  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err){
    //verify duplicate entry on username
    if(err){
    if(err.code == 11000){
      console.log(err);
      return res.json({success:false,message:'El nombre de usuario ya existe.'})
    }
  }
    res.json({message: 'Usuario registrado'});
  });
})
//get all users through get
//URL: http://localhost:5000/api/users
.get(function(req,res){
  User.find(function(err,users){
    if(err) return res.send(err);
    res.json(users);
  })
})

//register our ROUTES
app.use('/api',apiRouter);


app.listen(port);

console.log('Here we go!'+port);

//
//
// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname)+'/index.html');
// });
//
// //middleware
// adminRouter.use(function(req,res,next){
//   console.log('--->',req.method,req.url);
//   next();
// });
//
// adminRouter.param('name',function(req,res,next,name){
//   console.log("req.name",req.name);
//   console.log("name: ",name);
//   req.name = "Mr. Robot was here!";
//   next();
// });
//
// loginRouter.use(function(req,res,next){
//   console.log('login --->',req.method,req.url);
//   next();
// });
//
// loginRouter.param('user',function(req,res,next,user){
//   console.log("req",req.user);
//   console.log("user",user);
//   var userName = 'admin';
//
//   if(userName == user){
//     req.user = user;
//     next();
//   }
//   else {
//     console.log("Usuario invalido");
//     res.redirect('/error');
//   }
// });
//
// loginRouter.param('password',function(req,res,next,password){
//   var userPassword = 'admin1234';
//   if(userPassword == password){
//     req.password = password;
//     next();
//   }
//   else {
//     console.log("contrasena incorrecta");
//     res.redirect('/error');
//   }
// });
//
// loginRouter.get('/',function(req,res){
//   res.send('Necesita ingresar usuario');
// })
//
// loginRouter.get('/:user/:password',function(req,res){
//   res.send('Ingreso como ' + req.user + ' y password: '+ req.password);
// });
//
// adminRouter.get('/',function(req,res){
//   res.send('Estoy en la pagina principal del admin');
// });
//
// adminRouter.get('/users',function(req,res){
//   res.send('Aqui se mostraran los usuarios');
// });
//
// adminRouter.get('/users/:name',function(req,res){
//   res.send('Hola '+ req.name);
// });
//
// adminRouter.get('/posts',function(req,res){
//   res.send('Aqui se mostraran los articulos');
// });
//
// errorRouter.get('/',function(req,res){
//   res.send('Usuario o contrasena invalidos');
// });
//
// app.use('/admin',adminRouter);
// app.use('/login',loginRouter);
// app.use('/error',errorRouter);
// app.route('/account')
// .get(function(req,res){
//   console.log('Metodo GET');
//   res.send('Metodo GET');
// })
// .post(function(req,res){
//   console.log('Metodo POST');
//   res.send('Metodo POST');
// })
// .put(function(req,res){
//   console.log('Metodo PUT');
//   res.send('Metodo PUT');
// })
// .delete(function(req,res){
//   console.log('Metodo DELETE');
//   res.send('Metodo DELETE');
// });
//
// //app.set('port',(process.env.PORT || 5000));
