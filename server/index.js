const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

mongoose.connect(process.env.DATABASE);
mongoose.connection('once', () => {
  console.log('connected to the database')
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(9999, () => {
  console.log(`Server is running at http://localhost:9999`);
});
