//packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//pokemon schema
var pokemonSchema = new Schema({
  name: {
    type:String,
    required: true,
    index:{
      unique:true
    }
  },
  type: String,
  timesFound:{
    type:Number,
    default: 0
  },
  owner:{
    type:Schema.ObjectId,
    ref:'User'
  }

});

pokemonSchema.methods.sayHi = function(){
  var pokemon = this;
  return 'Hola!, soy un ' + pokemon.name + ' de tipo ' + pokemon.type;
}

pokemonSchema.post('findOne',function(pokemon){
  console.log(pokemon);
  pokemon.timesFound ++;
  pokemon.save();
})

module.exports = mongoose.model('Pokemon',pokemonSchema);
