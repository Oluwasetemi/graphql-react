require('dotenv').config({
  path: 'variable.env',
});
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();
app.use(cors());

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.once('open', () => {
  console.log('connected to the database ✔✔✔');
});
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.use('/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(9999, () => {
  console.log(`Server is running at http://localhost:9999`);
});
