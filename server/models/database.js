const mongoose = require('mongoose');
// connection avec la base de donnée mongo db 

const mongoUri = 'mongodb+srv://Malamine:test@test0.7dope.mongodb.net/test?';
if (!mongoUri) {
  throw new Error(
    'MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!',
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});
