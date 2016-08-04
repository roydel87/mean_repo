//call the packages
var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();
// var loginRouter = express.Router();
// var errorRouter = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
var User = require('./models/users');
var Pokemon = require('./models/pokemon');

var supersecret = 'strangeThingsHappenInArea51';

var port = process.env.PORT || 5000;


//APP CONFIGURATION
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type, Authorization');
    next();
});

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost/pokemon');
//mongoose.connect('mongodb://mongouser:mongouser@ds015750.mlab.com:15750/pokemon_rdh')


//API ROUTES
//Main basic route
//app.get('/', function(req, res) {
  //  res.send('Welcome to the real world!');
//});

//Express router instance
var apiRouter = express.Router();

//http://localhost:5000/api

apiRouter.post('/authenticate',function(req,res){
  User.findOne({
    username: req.body.username
  })
  .select('name username password')
  .exec(function(err,user){
    if(err) throw err;

    //username not found
    if(!user){
      res.json({
        success:false,
        message:'La autenticacion ha fallado. El usuario no existe'
      })
    }else if(user){
      //validate if password matches
      var validPassword = user.comparePassword(req.body.password);
      if(!validPassword){
        res.json({
          success: false,
          message: 'La autenticacion ha fallado. Contrasenia incorrecta'
        })
      }else{
        //If authenticate process is OK then
        //generate token
        //var token = jwt.sign(payload,secretOrPrivatekey,option,callback)
        var token = jwt.sign({
          name: user.name,
          username: user.username
        },supersecret,{
          expiresIn: '100'
        }
        )
        res.json({
          success:true,
          message: 'Swordfish: Acceso autorizado',
          token: token
        })
      }
    }
  })
})


//middleware to verify the token
apiRouter.use(function(req,res,next){
  console.log('Alguien ha entrado a la matrix!');
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    //verify token
    jwt.verify(token,supersecret,function(err,decoded){
      if(err){
        return res.json({
          success: false,
          message: 'Fallo la autentificacion del token.'
        })
      }else{
        console.log(decoded);
        req.decoded = decoded;
        next();
      }
    })
  }else{
    return res.status(403).send({
      success: false,
      message: 'No se envio el token.'
    })
  }
})

apiRouter.get('/', function(req, res) {
    res.json({
        message: 'Welcome to Zion! (Our mother API)'
    })
});

apiRouter.get('/me',function(req,res){
  res.json({
    message: 'Welcome ' + req.decoded.name + ', username: ' + req.decoded.username
  })
})

//routes users
apiRouter.route('/users')
    //create user through POST
    //URL: http://localhost:5000/api/users
    .post(function(req, res) {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function(err) {
            //verify duplicate entry on username
            if (err) {
                if (err.code == 11000) {
                    console.log(err);
                    return res.json({
                        success: false,
                        message: 'El nombre de usuario ya existe.'
                    })
                }
            }
            res.json({
                message: 'Usuario registrado'
            });
        });
    })
    //get all users through get
    //URL: http://localhost:5000/api/users
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) return res.send(err);
            res.json(users);
        })
    })

apiRouter.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) return res.send(err);
            res.json(user);
        })
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
                if (err) return res.send(err);
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;

                user.save(function(err) {
                    if (err) return res.send(err);
                    res.json({
                        message: 'Usuario actualizado'
                    });
                })
            })
          })
    .delete(function(req, res) {
        User.remove({
          _id: req.params.user_id
        },function(err,user){
          if(err) return res.send(err);
          res.json({message:'Usuario eliminado'});
        })
    });

apiRouter.route('/pokemons')
.get(function(req,res){
  //Pokemon.find(function(err, pokemons) {
  //    if (err) return res.send(err);
  //    res.json(pokemons);
  //})
  Pokemon.find({},function(err,pokemons){
    User.populate(pokemons,{
      path: 'owner',
      select: {name:1,username:1},
      match: {username:'usertest'}
    },function(err,pokemons){
      res.status(200).json(pokemons);
    })
  })
  //.skip(4).limit(3)
  //.sort({name:-1})
  .select({name:1,type:1,owner:1})
})
.post(function(req,res){
  var pokemon = new Pokemon();
  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  pokemon.owner = req.body.owner;

  pokemon.save(function(err) {
      //verify duplicate entry on username
      if (err) {
          if (err.code == 11000) {
              console.log(err);
              return res.json({
                  success: false,
                  message: 'El pokemon ya existe.'
              })
          }
      }
      res.json({
          message: 'Pokemon registrado'
      });
  });
});

apiRouter.route('/pokemons/:pokemon_id')
.get(function(req,res){
  Pokemon.findOne({
    _id: req.params.pokemon_id
  },function(err,pokemon){
    if(err) return res.send(err);
    res.json({
      message:pokemon.sayHi(),
      count: pokemon.timesFound
    });
  })
})
.put(function(req,res){
  Pokemon.findById(req.params.pokemon_id, function(err, pokemon) {
          if (err) return res.send(err);
          if (req.body.name) pokemon.name = req.body.name;
          if (req.body.type) pokemon.type = req.body.type;
          if(req.body.owner) pokemon.owner = req.body.owner;

          pokemon.save(function(err) {
              if (err) return res.send(err);
              res.json({
                  message: 'Pokemon actualizado'
              });
          })
      })
})
.delete(function(req,res){
  Pokemon.remove({
    _id: req.params.pokemon_id
  },function(err,pokemon){
    if(err) return res.send(err);
    res.json({message:'Pokemon eliminado'});
  })
})

apiRouter.route('/pokemons/type/:type')
.get(function(req,res){
  Pokemon.find({
    //type: /lectric/i
    //type:req.params.type
    //type:new RegExp(req.params.type,'i'),
    //name: /chu/i
    $or: [{type:/Electric/i},{type:/fire/i}],
    //timesFound: {
      //$gt:0,
      //$lt:2
    //},
    timesFound:{
      $in:[1,0]
    }
  },function(err,pokemons){
    res.json(pokemons);
  })
})
  //register our ROUTES
  app.use('/api', apiRouter);
app.use(express.static(__dirname + '/public'));

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
})

  app.listen(port);
  console.log('Here we go!!');
