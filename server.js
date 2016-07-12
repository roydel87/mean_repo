var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();
var loginRouter = express.Router();
var errorRouter = express.Router();

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname)+'/index.html');
});

//middleware
adminRouter.use(function(req,res,next){
  console.log('--->',req.method,req.url);
  next();
});

adminRouter.param('name',function(req,res,next,name){
  console.log("req.name",req.name);
  console.log("name: ",name);
  req.name = "Mr. Robot was here!";
  next();
});

loginRouter.use(function(req,res,next){
  console.log('login --->',req.method,req.url);
  next();
});

loginRouter.param('user',function(req,res,next,user){
  console.log("req",req.user);
  console.log("user",user);
  var userName = 'admin';

  if(userName == user){
    req.user = user;
    next();
  }
  else {
    console.log("Usuario invalido");
    res.redirect('/error');
  }
});

loginRouter.param('password',function(req,res,next,password){
  var userPassword = 'admin1234';
  if(userPassword == password){
    req.password = password;
    next();
  }
  else {
    console.log("contrasena incorrecta");
    res.redirect('/error');
  }
});

loginRouter.get('/',function(req,res){
  res.send('Necesita ingresar usuario');
})

loginRouter.get('/:user/:password',function(req,res){
  res.send('Ingreso como ' + req.user + ' y password: '+ req.password);
});

adminRouter.get('/',function(req,res){
  res.send('Estoy en la pagina principal del admin');
});

adminRouter.get('/users',function(req,res){
  res.send('Aqui se mostraran los usuarios');
});

adminRouter.get('/users/:name',function(req,res){
  res.send('Hola '+ req.name);
});

adminRouter.get('/posts',function(req,res){
  res.send('Aqui se mostraran los articulos');
});

errorRouter.get('/',function(req,res){
  res.send('Usuario o contrasena invalidos');
});

app.use('/admin',adminRouter);
app.use('/login',loginRouter);
app.use('/error',errorRouter);
app.route('/account')
.get(function(req,res){
  console.log('Metodo GET');
  res.send('Metodo GET');
})
.post(function(req,res){
  console.log('Metodo POST');
  res.send('Metodo POST');
})
.put(function(req,res){
  console.log('Metodo PUT');
  res.send('Metodo PUT');
})
.delete(function(req,res){
  console.log('Metodo DELETE');
  res.send('Metodo DELETE');
});

app.set('port',(process.env.PORT || 5000));
app.listen(app.get('port'));

console.log('Here we go!');
