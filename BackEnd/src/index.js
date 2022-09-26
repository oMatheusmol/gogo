/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const router = new express.Router();
const questionsRouter = require('./router');

const app = express();
const port = process.env.PORT || 3000;

questionsRouter(router);
app.use(express.json());
app.use(router);
app.use(cors());

const server = app.listen(port, () => {
  console.log('Listening on port %s', server.address().port);
  console.log('http://localhost:%s', server.address().port);
});

module.exports = { server };
