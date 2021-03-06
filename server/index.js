const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('../client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
  console.log('Listening on port 3000');
});
