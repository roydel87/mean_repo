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
var Pokemon = require('./models/pokemon');

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
app.get('/', function(req, res) {
    res.send('Welcome to the real world!');
});

//Express router instance
var apiRouter = express.Router();

//http://localhost:5000/api
apiRouter.get('/', function(req, res) {
    res.json({
        message: 'Welcome to Zion! (Our mother API)'
    })
});

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
  Pokemon.find(function(err, pokemons) {
      if (err) return res.send(err);
      res.json(pokemons);
  })
})
.post(function(req,res){
  var pokemon = new Pokemon();
  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  pokemon.timesFound = req.body.timesFound;

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
  //register our ROUTES
  app.use('/api', apiRouter);
  app.listen(port);
  console.log('Here we go!!');
