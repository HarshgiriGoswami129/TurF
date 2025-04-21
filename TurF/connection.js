const mongoose = require('mongoose');

async function connectionMongoose(url){
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
}

module.exports ={
    connectionMongoose
}